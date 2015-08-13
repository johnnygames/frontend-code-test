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
    console.log(JSON.parse(localStorage.getItem('recipeListPersist')).recipes, 'mounting');
    if (!JSON.parse(localStorage.getItem('recipeListPersist')).recipes.length > 0) {
      console.log('hi');
      $.getJSON('recipes.json', function (data) {
        self.setState({
          recipes: data
        });
      });
    } else {
      self.setState({
        recipes: JSON.parse(localStorage.getItem('recipeListPersist')).recipes
      });
    }
  },
  handleInput: function (input) {
    if (!input) {
      $.getJSON('recipes.json', function (data) {
        this.setState({
          recipes: data
        });
      }.bind(this));
    }
    var filteredRecipes = this.state.recipes.filter(function (recipe) {
      return recipe.ingredients.indexOf(input) >= 0;
    });
    this.setState({
      recipes: filteredRecipes
    });
    localStorage.setItem('recipeListPersist', JSON.stringify({recipes: filteredRecipes}));
    localStorage.setItem('textInput', JSON.stringify({textInputLocal: input}));
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
        <InputField handleInput={this.handleInput} textInputPersist={this.state.textInput}/>
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
