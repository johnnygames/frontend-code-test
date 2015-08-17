var axios = require('axios');

var helpers = {
  getRecipes: function () {
    return axios.get('recipes.json');
  }
};

module.exports = helpers;
