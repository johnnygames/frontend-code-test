var React = require('react');
var IngredientList = require('./IngredientList.js');

var RecipeItem = React.createClass({
  handleClick: function (recipeName) {
    this.props.handleSelection(recipeName);
  },
  render: function () {
    return (
      <span>
        <input
          type="checkbox"
          onChange={this.handleClick.bind(null, this.props.recipeInfo.name)}
          checked={this.props.checked}
        >
        </input>
      <span>
        <span>Name: </span><strong>{this.props.recipeInfo.name}</strong>
      </span>
      {
        this.props.checked && <IngredientList ingredients={this.props.recipeInfo.ingredients} />
      }
      </span>
    );
  }
});

module.exports = RecipeItem;
