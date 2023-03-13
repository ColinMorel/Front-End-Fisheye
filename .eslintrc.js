module.exports = {
    rules: { 
      "no-unused-vars": "off", //Pour les variables/fonctions déclarées et utilisées dans un autre document
    },
    "parserOptions": { //ESLint defaults to ES5 syntax-checking. You'll want to override to the latest well-supported version of JavaScript.
      "ecmaVersion": "latest"
  },
  "env": {
      "es6": true
  }
}
