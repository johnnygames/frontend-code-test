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
          defaultChecked={checkedStatus}
        >
        </input>
      <h4 ref={this.props.indexRecipe}>
        {this.props.recipeInfo.name}
        {this.props.recipeInfo.type}
        {this.props.recipeInfo.cook_time}
      </h4>
      {
        checkedStatus && <IngredientList ingredients={this.props.recipeInfo.ingredients} />
      }
      </span>
    );
  }
});

module.exports = RecipeItem;
//onClick={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
