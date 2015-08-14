var React = require('react');
var RecipeApp = require('./components/RecipeApp.js');
import './css/styles.css';

main();

function main() {
    React.render(<RecipeApp />, document.body);
}
