var React = require('react');

var InputField = React.createClass({
  componentDidMount: function () {
    if (localStorage.getItem('textInput') !== null) {
      document.getElementById('ingredientToFilter').value = JSON.parse(localStorage.getItem('textInput')).textInputLocal;
    }
  },
  handleIngredientInput: function (e) {
    e.preventDefault();
    var input = document.getElementById('ingredientToFilter').value;
    this.props.handleInput(input);
  },
  render: function () {
    return (
    <div>
      <form onSubmit={this.handleIngredientInput}>
        What's in mystery basket number one?! <input type="text" name="filter" id="ingredientToFilter"></input>
      </form>
    </div>
    );
  }
});

module.exports = InputField;
