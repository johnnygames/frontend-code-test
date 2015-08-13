var React = require('react');

var IngredientList = React.createClass({
  render: function () {
    var sortedIngredients = this.props.ingredients.sort();

    return (
      <ul>
        {sortedIngredients.map(function (ingredient) {
          return <li>{ingredient}</li>;
        })}
      </ul>
    );
  }
});

module.exports = IngredientList;
