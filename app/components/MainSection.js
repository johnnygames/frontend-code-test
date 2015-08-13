var React = require('react');
var $ = require('jquery');
var RecipeList = require('./RecipeList.js');
var InputField = require('./InputField.js');

var MainSection = React.createClass({
  getInitialState: function () {
    return {
      recipes: [],
      selectedRecipeIndex: []
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
  handleRecipeSelection: function (input) {
    var updatedSelection = [];
    updatedSelection.push(input);
    this.setState({
      selectedRecipeIndex: updatedSelection
    })
    console.log(this.state.selectedRecipeIndex);
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
      </div>
    )
  }
})

module.exports = MainSection;
