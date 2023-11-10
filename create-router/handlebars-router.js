const handlebars = require('../handlebars');

handlebars.registerHelper('routerCreateRouter', function (data) {
    let codeString = JSON.stringify(data)
    return new handlebars.SafeString(codeString);
})

module.exports = handlebars