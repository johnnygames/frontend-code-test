var React = require('react');
var $ = require('jquery');
var RecipeList = require('./RecipeList.js');
var InputField = require('./InputField.js');
var CombinationIngredientList = require('./CombinationIngredientList.js');

var MainSection = React.createClass({
  getInitialState: function () {
    return {
      recipes: [],
      selectedRecipeIndex: {},
      totalIngredients: {}
    }
  },
  componentDidMount: function () {
    var self = this;
    $.getJSON('recipes.json', function (data) {
      self.setState({
        recipes: data
      });
    });
  },
  handleInput: function (input) {
    var filteredRecipes = this.state.recipes.filter(function (recipe) {
      return recipe.ingredients.indexOf(input) >= 0;
    });
    this.setState({
      recipes: filteredRecipes
    });
  },
  updateIngredients: function (input, ingredientArray) {
    if (this.state.selectedRecipeIndex[input]) {
      var currentIngredients = this.state.totalIngredients;
      for (var i = 0; i < ingredientArray.length; i++) {
        delete currentIngredients[ingredientArray[i]];
      }
      this.setState({
        totalIngredients: currentIngredients
      })
    } else {
        var ingredientObject = this.state.totalIngredients;
        for (var i = 0; i < ingredientArray.length; i++) {
          ingredientObject[ingredientArray[i]] = true;
        }
        this.setState({
          totalIngredients: ingredientObject
        })
    }
  },
  updateSelection: function (input) {
    var updatedSelection = this.state.selectedRecipeIndex;
    if (this.state.selectedRecipeIndex[input]) {
      delete updatedSelection[input];
      this.setState({
        selectedRecipeIndex: updatedSelection
      })
    } else {
      updatedSelection[input] = true;
      this.setState({
        selectedRecipeIndex: updatedSelection
      })
    }
  },
  handleRecipeSelection: function (input, ingredientArray) {
    this.updateIngredients(input, ingredientArray);
    this.updateSelection(input);
 },
  render: function () {
    return (
      <div>
        <InputField handleInput={this.handleInput} />
        <RecipeList
          recipes={this.state.recipes}
          handleSelection={this.handleRecipeSelection}
          selectedRecipes={this.state.selectedRecipeIndex}
        />
        <CombinationIngredientList comboIngredients={this.state.totalIngredients} />
      </div>
    )
  }
})

module.exports = MainSection;
