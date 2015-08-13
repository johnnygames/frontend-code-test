var React = require('react');

var CombinationIngredientList = React.createClass({
  render: function () {
    console.log(Object.keys(this.props.comboIngredients));
    return (
      <div>
        {
            Object.keys(this.props.comboIngredients).sort().map(function (ingredient) {
              console.log('hello');
              return <li>{ingredient}</li>;
            })
        }
    </div>
    );
  }
});

module.exports = CombinationIngredientList;
