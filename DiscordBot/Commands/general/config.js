const fs = require('fs');
const path = require('path');
const config = require('../../../config.json');

/**
 * The function sets a new prefix for a configuration file and logs the change.
 * @param newPrefix - A string representing the new prefix that will be set.
 */
function setPrefix(newPrefix){
    config.prefix = newPrefix;
    fs.writeFileSync(path.resolve(__dirname, '../../../config.json'), JSON.stringify(config, null, 2));
    console.log(`Prefix set to ${config.prefix}`);
}

module.exports = { setPrefix };