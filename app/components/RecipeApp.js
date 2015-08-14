var React = require('react');
var MainSection = require('./MainSection.js');

var RecipeApp = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>Definitive Chopped Cheatsheet</h1>
        </header>
        <MainSection />
      </div>
    )
  }
})

module.exports = RecipeApp;
