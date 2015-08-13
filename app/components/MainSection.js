var React = require('react/addons');
var $ = require('jquery');
var RecipeList = require('./RecipeList.js');
var InputField = require('./InputField.js');
var CombinationIngredientList = require('./CombinationIngredientList.js');

var MainSection = React.createClass({
  getInitialState: function () {
    return {
      recipes: [],
      selectedRecipeIndex: {},
      totalIngredients: {},
      checked: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7:false}
    }
  },
  componentDidMount: function () {
    var self = this;
    localStorage.setItem('checkedStatus', JSON.stringify(this.state.checked));
    if (!JSON.parse(localStorage.getItem('recipeListPersist')).recipes.length > 0) {
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
    if(!!JSON.parse(localStorage.getItem('totalIngredientList')).list) {
      self.setState({
        totalIngredients: JSON.parse(localStorage.getItem('totalIngredientList')).list
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
    //If the recipe that is clicked on already exists in the list aka is being currently UNSELECTED
    if (this.state.selectedRecipeIndex[input]) {
      //If the clicked on recipe is the only one in the list just remove all
      if (Object.keys(this.state.selectedRecipeIndex).length === 1) {
        var currentIngredientsOne = this.state.totalIngredients;
        for (var k = 0; k < ingredientArray.length; k++) {
          delete currentIngredientsOne[ingredientArray[k]];
        }
      }
      var currentIngredients = this.state.totalIngredients;
      //Loop through here necessary to check if other recipes require an ingredient we're supposed to get rid of
      for (var i = 0; i < ingredientArray.length; i++) {
        for (var j = 0; j < Object.keys(this.state.selectedRecipeIndex).length; j++) {
          if (this.state.recipes[j].ingredients.indexOf(ingredientArray[i]) >= 0) {
            continue;
          } else {
            delete currentIngredients[ingredientArray[i]];
          }
        }
      }
      this.setState({
        totalIngredients: currentIngredients
      })
      localStorage.setItem('totalIngredientList', JSON.stringify({list: currentIngredients}));
    } else {
        var ingredientObject = this.state.totalIngredients;
        for (var i = 0; i < ingredientArray.length; i++) {
          ingredientObject[ingredientArray[i]] = true;
        }
        this.setState({
          totalIngredients: ingredientObject
        })
        localStorage.setItem('totalIngredientList', JSON.stringify({list: ingredientObject}));
    }
  },
  updateSelection: function (input) {
    var updatedSelection = this.state.selectedRecipeIndex;
    var newCheckedState = React.addons.update(this.state.checked, {
      input: {$set: !this.state.checked[input]}
    });
    this.setState(newCheckedState);
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
        <CombinationIngredientList
          comboIngredients={this.state.totalIngredients}
          checked={this.state.checked}
        />
      </div>
    )
  }
})

module.exports = MainSection;
