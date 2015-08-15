var React = require('react');
var IngredientList = require('./IngredientList.js');

var RecipeItem = React.createClass({
  handleClick: function (ingredients, index) {
    this.props.nextLevelProp(index, ingredients);
  },
  render: function () {
    var index = this.props.indexRecipe;
    var checkedStatus = JSON.parse(localStorage.getItem('checkedStatus'))[index];
    return (
      <span>
        <input
          type="checkbox"
          onChange={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
          checked={checkedStatus}
        >
        </input>
      <span ref={this.props.indexRecipe}>
        <span>Name: </span><strong>{this.props.recipeInfo.name}</strong>
      </span>
      {
        checkedStatus && <IngredientList ingredients={this.props.recipeInfo.ingredients} />
      }
      </span>
    );
  }
});

module.exports = RecipeItem;
//onClick={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
