var React = require('react');
var IngredientList = require('./IngredientList.js');

var RecipeItem = React.createClass({
  handleClick: function (ingredients, index) {
    var holder = !JSON.parse(localStorage.getItem('checkedStatus'))[index];
    localStorage.setItem('checkedStatus', JSON.stringify({index: holder}));
    this.props.nextLevelProp(index, ingredients);
  },
  render: function () {
    var index = this.props.indexRecipe;
    var checkedStatus = JSON.parse(localStorage.getItem('checkedStatus'))[index] || false;
    return (
      <span>
        <input
          type="checkbox"
          onChange={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
          checked={checkedStatus}
        >
        </input>
      <h4 ref={this.props.indexRecipe}>
        {this.props.recipeInfo.name}
        {this.props.recipeInfo.type}
        {this.props.recipeInfo.cook_time}
      </h4>
      {
        this.props.selectionIndex[this.props.indexRecipe] && <IngredientList ingredients={this.props.recipeInfo.ingredients} />
      }
      </span>
    );
  }
});

module.exports = RecipeItem;
//onClick={this.handleClick.bind(null, this.props.recipeInfo.ingredients, this.props.indexRecipe)}
