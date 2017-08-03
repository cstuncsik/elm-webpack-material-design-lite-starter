require('./assets/styles/index.scss')
const Elm = require('./App/App.elm')

const element = document.getElementById('app')
const ElmApp = Elm.App.embed(element)

module.exports = ElmApp
