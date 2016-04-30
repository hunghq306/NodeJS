/**
 * export Object - not class
 * return json by require
 *
 * @type {AzureSearch}
 */
module.exports = new AzureSearch();

function AzureSearch() {

}

AzureSearch.prototype.supportedFileFormat = require('./supportedFileTypes.json');
