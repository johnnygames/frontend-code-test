var React = require('react');

var CombinationIngredientList = React.createClass({
  render: function () {
    return (
      <div>
        {
            Object.keys(this.props.comboIngredients).sort().map(function (ingredient) {
              return <li>{ingredient}</li>;
            })
        }
    </div>
    );
  }
});

module.exports = CombinationIngredientList;
