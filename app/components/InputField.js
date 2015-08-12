var React = require('react');

var InputField = React.createClass({
  handleIngredientInput: function (e) {
    e.preventDefault();
    var input = document.getElementById('ingredientToFilter').value;
    this.props.handleInput(input);
  },
  render: function () {
    return (
    <div>
      <form onSubmit={this.handleIngredientInput}>
        Please insert a ingredient you would like to filter on! <input type="text" name="filter" id="ingredientToFilter"></input>
      </form>
    </div>
    );
  }
});

module.exports = InputField;
