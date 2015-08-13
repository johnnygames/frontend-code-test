var React = require('react');
var IngredientList = require('./IngredientList.js');

var RecipeItem = React.createClass({
  handleClick: function (ingredients, index) {
    console.log(ingredients, index, 'hi');
    this.props.nextLevelProp(index);
  },
  render: function () {
    console.log(this.props.selectionIndex, 'selectionIndex');
    return (
      <div>
      <h4 onClick={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)} ref={this.props.indexRecipe}>
        {this.props.recipeInfo.name}
        {this.props.recipeInfo.type}
        {this.props.recipeInfo.cook_time}
      </h4>
      {
        this.props.selectionIndex.indexOf(this.props.indexRecipe) >= 0 && <IngredientList ingredients={this.props.recipeInfo.ingredients} />
      }
      </div>
    );
  }
});

module.exports = RecipeItem;
//onClick={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
