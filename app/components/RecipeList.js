var React = require('react');
var RecipeItem = require('./RecipeItem.js');

var RecipeList = React.createClass({
  showIngredients: function (recipe, e) {
    e.preventDefault();
    console.log('hello from recipelist')
  },
  render: function () {
    var newSelection = this.props.handleSelection;
    var recipeIndex = this.props.selectedRecipes;
    var self = this;
    return (
      <div>
        <ol>
          {this.props.recipes.map(function (recipe, index) {
            return (
              <li>
                <RecipeItem
                  recipeInfo={recipe}
                  indexRecipe={index}
                  nextLevelProp={newSelection}
                  selectionIndex={recipeIndex}
                  onClick={self.showIngredients.bind(null, recipe.ingredients)}
                />
              </li>
            )
          })
          }
        </ol>
      </div>
    );
  }
});

module.exports = RecipeList;
