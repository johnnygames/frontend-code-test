var React = require('react');

var CombinationIngredientList = React.createClass({
  render: function () {
    var style = {
      width: '50%',
      float: 'right'
    };
    return (
      <div style={style}>
        <h2>Total Ingredient List!</h2>
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
