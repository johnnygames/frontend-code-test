var React = require('react');

var IngredientList = React.createClass({
  render: function () {
    return (
      <li>
        {this.props.ingredients}
      </li>
    );
  }
});

module.exports = IngredientList;
