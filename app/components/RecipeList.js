var React = require('react');
var RecipeItem = require('./RecipeItem.js');

var RecipeList = React.createClass({
  render: function () {
    return (
      <div>
        <ol>
          {this.props.recipes.map(function (recipe, index) {
            return (
              <li><RecipeItem recipeInfo={recipe} key={index} /></li>
            )
         })
          }
        </ol>
      </div>
    );
  }
});

module.exports = RecipeList;
