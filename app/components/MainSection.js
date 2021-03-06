var React = require('react/addons');
var _ = require('underscore');
var RecipeList = require('./RecipeList.js');
var InputField = require('./InputField.js');
var CombinationIngredientList = require('./CombinationIngredientList.js');
var helpers = require('../utils/getDataAPI.js');

var MainSection = React.createClass({
  getInitialState: function () {
    return {
      recipes: []
    };
  },
  componentDidMount: function () {
    var self = this;
    if (localStorage.getItem('localRecipes') === null) {
      helpers.getRecipes()
      .then(function (data) {
        self.setState({
          recipes: self.extendRecipeObject(data.data)
        });
      });
    } else {
      self.setState({
        recipes: JSON.parse(localStorage.getItem('localRecipes')).recipes
      });
    }
  },
  extendRecipeObject: function (recipeData) {
    var addCheckStatusObject = {filtered: false, checked: false};
    for (var i = 0; i < recipeData.length; i++) {
      _.extend(recipeData[i], addCheckStatusObject);
    }
    return recipeData;
  },
  handleInput: function (input) {
    var noMatchingIngredient = true;
    var recipesAfterNoInput = [];
    var self = this;
    if (!input) {
      helpers.getRecipes()
        .then(function (data) {
          recipesAfterNoInput = self.extendRecipeObject(data.data);
          self.setState({
            recipes: recipesAfterNoInput
          });
          localStorage.setItem('textInput', JSON.stringify({textInputLocal: ''}));
          localStorage.setItem('localRecipes', JSON.stringify({recipes: recipesAfterNoInput}));
        });
      return;
    }
    var filteredRecipes = this.state.recipes.map(function (recipe, index) {
      if (recipe.ingredients.indexOf(input) >= 0) {
        noMatchingIngredient = false;
      } else {
        recipe.filtered = true;
      }
      return recipe;
    });
    if (noMatchingIngredient) {
      return;
    }
    this.setState({
      recipes: filteredRecipes
    });
    localStorage.setItem('textInput', JSON.stringify({textInputLocal: input}));
    localStorage.setItem('localRecipes', JSON.stringify({recipes: filteredRecipes}));

  },
  updateSelection: function (input) {
    var newCheckedStatus = this.state.recipes;
    for (var i = 0; i < newCheckedStatus.length; i++) {
      if (newCheckedStatus[i].name === input) {
        newCheckedStatus[i].checked = !newCheckedStatus[i].checked;
      }
    }
    this.setState({
      recipes: newCheckedStatus
    });
    localStorage.setItem('localRecipes', JSON.stringify({recipes: newCheckedStatus}));
  },
  render: function () {
    return (
      <div>
        <InputField handleInput={this.handleInput} />
        <RecipeList
          recipes={this.state.recipes}
          handleSelection={this.updateSelection}
        />
        <CombinationIngredientList
          recipes={this.state.recipes}
        />
      </div>
    );
  }
});

module.exports = MainSection;
