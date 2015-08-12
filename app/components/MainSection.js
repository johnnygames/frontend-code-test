var React = require('react');
var $ = require('jquery');
var RecipeList = require('./RecipeList.js');
var InputField = require('./InputField.js');

var MainSection = React.createClass({
  getInitialState: function () {
    return {
      recipes: []
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
   console.log(input);
   var filteredRecipes = this.state.recipes.filter(function (recipe) {
     return recipe.ingredients.indexOf(input) >= 0;
   });
   this.setState({
     recipes: filteredRecipes
   });
  },
  render: function () {
    return (
      <div>
        <InputField handleInput={this.handleInput} />
        <RecipeList recipes={this.state.recipes} />
      </div>
    )
  }
})

module.exports = MainSection;
