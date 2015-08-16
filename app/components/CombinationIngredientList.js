var React = require('react');

var CombinationIngredientList = React.createClass({
  createIngredientList: function (arrayOfRecipes) {
    var listOfIngredients = {};
    for (var i = 0; i < arrayOfRecipes.length; i++) {
      if(arrayOfRecipes[i].checked && !arrayOfRecipes[i].filtered) {
        for (var j = 0; j < arrayOfRecipes[i].ingredients.length; j++) {
          listOfIngredients[arrayOfRecipes[i].ingredients[j]] = true;
        }
      }
    }
    return listOfIngredients;
  },
  render: function () {
    var listOfIngredients = this.createIngredientList(this.props.recipes);
    var style = {
      width: '40%',
      float: 'right'
    };
    return (
      <div style={style} className="ingredientList">
        <h2>Total Ingredient List!</h2>
        {
          Object.keys(listOfIngredients).sort().map(function (ingredient) {
            return <li>{ingredient}</li>;
          })
        }
    </div>
    );
  }
});

module.exports = CombinationIngredientList;
