var React = require('react/addons');
var $ = require('jquery');
var _ = require('underscore');
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
    if (JSON.parse(localStorage.getItem('checkedStatus'))[input]) {
      console.log(JSON.parse(localStorage.getItem('checkedStatus'))[input], 'is this true of false, first test');
      //If the clicked on recipe is the only one in the list just remove all
      var checkCounter = 0;
      for (var key in JSON.parse(localStorage.getItem('checkedStatus'))) {
        if (JSON.parse(localStorage.getItem('checkedStatus'))[key]) {
          console.log('yay true');
          checkCounter++;
        }
      }
      if (checkCounter <= 1) {
        console.log(checkCounter, 'length of 1');
        var currentIngredientsOne = this.state.totalIngredients;
        var currentIngredientsPersistent = JSON.parse(localStorage.getItem('totalIngredientList')).list;
        console.log(currentIngredientsPersistent, 'persistent');
        for (var k = 0; k < ingredientArray.length; k++) {
          delete currentIngredientsOne[ingredientArray[k]];
          //delete currentIngredientsPersistent[ingredientArray[k]];
        }
        localStorage.setItem('totalIngredientList', JSON.stringify({list: currentIngredients}));
        return;
      }
      console.log(checkCounter, 'length greater than 1');
      var currentIngredients = this.state.totalIngredients;
      //Loop through here necessary to check if other recipes require an ingredient we're supposed to get rid of
      for (var i = 0; i < ingredientArray.length; i++) {
        console.log('do we get into this for loop');
        for (var j = 0; j < Object.keys(JSON.parse(localStorage.getItem('checkedStatus'))).length; j++) {
          if (JSON.parse(localStorage.getItem('checkedStatus'))[j]) {
           if (this.state.recipes[j].ingredients.indexOf(ingredientArray[i]) >= 0) {
             console.log(this.state.recipes[j].ingredients, 'j ', j);
             continue;
          } else {
            delete currentIngredients[ingredientArray[i]];
            //            delete currentIngredientsPersistent[ingredientArray[j]];
            }
          }
        }
      }
      this.setState({
        totalIngredients: currentIngredients
      })
      localStorage.setItem('totalIngredientList', JSON.stringify({list: currentIngredients}));
    } else {
      console.log('this is the else statement, if the checkedStatus was false');
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
    var newUnderSelection = _.extend({}, JSON.parse(localStorage.getItem('checkedStatus')));
    newUnderSelection[input] = !JSON.parse(localStorage.getItem('checkedStatus'))[input];
    var updatedSelection = this.state.selectedRecipeIndex;
    this.setState({
      checked: newUnderSelection
    });
    localStorage.setItem('checkedStatus', JSON.stringify(newUnderSelection));
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
          checked={this.state.checked}
        />
        <CombinationIngredientList
          comboIngredients={this.state.totalIngredients}
        />
      </div>
    )
  }
})

module.exports = MainSection;
