const fs = require('fs');
const path = require('path');
const config = require('../../../config.json');

function setPrefix(newPrefix){
    config.prefix = newPrefix;
    fs.writeFileSync(path.resolve(__dirname, '../../../config.json'), JSON.stringify(config, null, 2));
    console.log(`Prefix set to ${config.prefix}`);
}

module.exports = { setPrefix };