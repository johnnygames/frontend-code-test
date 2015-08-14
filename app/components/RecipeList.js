var React = require('react');
var RecipeItem = require('./RecipeItem.js');

var RecipeList = React.createClass({
    render: function () {
    var newSelection = this.props.handleSelection;
    var recipeIndex = this.props.selectedRecipes;
    var checked = this.props.checked;
    var self = this;
    var style = {
      width: '40%',
      float: 'left'
    };
    console.log(checked);
    return (
      <div style={style} className="recipeList">
        <h2>Recipe List!</h2>
        <ul>
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
        </ul>
      </div>
    );
  }
});

module.exports = RecipeList;
