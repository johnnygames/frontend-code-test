var React = require('react');
var RecipeItem = require('./RecipeItem.js');

var RecipeList = React.createClass({
    render: function () {
    var newSelection = this.props.handleSelection;
    var recipeIndex = this.props.selectedRecipes;
    var checked = this.props.checked;
    var self = this;
    var style = {
      width: '50%',
      float: 'left'
    };
    return (
      <div style={style}>
        <h2>Recipe List!</h2>
        <ol>
          {this.props.recipes.map(function (recipe, index) {
            return (
              <li>
                <RecipeItem
                  recipeInfo={recipe}
                  indexRecipe={index}
                  nextLevelProp={newSelection}
                  selectionIndex={recipeIndex}
                  checked={checked[index]}
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
