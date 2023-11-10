
const fs = require('fs');
const path = require('path');
const handlebars = require('./handlebars-router');
const utils = require('../utils');
const compress = require('../compress');
const tpl = fs.readFileSync(path.join(__dirname, './router.tpl'), 'utf8');
const template = handlebars.compile(tpl);

const genderRoutes = require('./router')

module.exports = function (srcPath, appJson) {
    let dataJSON = genderRoutes(appJson.app.index_page_id, appJson.layouts, appJson.groups, appJson.pages)
    fs.writeFileSync(path.join(srcPath, 'routes.js'),  compress(template({
        data: dataJSON
    })))
}
