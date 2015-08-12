var React = require('react');

var RecipeItem = React.createClass({
  render: function () {
    return (
      <h4>
        {this.props.recipeInfo.name}
        {this.props.recipeInfo.type}
        {this.props.recipeInfo.cook_time}
      </h4>
    );
  }
});

module.exports = RecipeItem;
