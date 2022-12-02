const { setupDb } = require('./setupDb')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
    on('task', {
        setupDb
    })
    on('file:preprocessor', cucumber())
}