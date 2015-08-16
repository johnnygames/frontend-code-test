var React = require('react');
var RecipeItem = require('./RecipeItem.js');

var RecipeList = React.createClass({
    render: function () {
      var filterOutRecipes = this.props.recipes.filter(function (recipe) {
        return !recipe.filtered;
      });
      var handleSelection = this.props.handleSelection;
      var style = {
        width: '50%',
        float: 'left'
      };
      return (
        <div style={style} className="recipeList">
          <h2>Recipe List!</h2>
          <ul>
            {
              filterOutRecipes.map(function (recipe, index) {
                  return (
                    <li>
                      <RecipeItem
                        recipeInfo={recipe}
                        indexRecipe={index}
                        handleSelection={handleSelection}
                        checked={recipe.checked}
                      />
                    </li>
                  );
              })
            }
          </ul>
        </div>
      );
    }
});

module.exports = RecipeList;
