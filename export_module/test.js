var Log = require('./log'); // this is class
var AzureSearch = require('./azureSearch'); // this is Object

// new Log(null); // run constructor

// Log.createLogger(); // static method

// Log.mute(); error : Log.mute is not a function
// new Log().mute(); // run constructor and mute method

// Log.mute2(); // Log.mute2 is not a function (this is private function)

console.log('=== AzureSearch.supportedFileFormat : ', AzureSearch.supportedFileFormat); // function return json

