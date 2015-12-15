var Dropbox = require("dropbox");

var client = new Dropbox.Client({ token: '4oodBJjnQhMAAAAAAAAAI3jXFReaxPiHcZSiijY--RNqcw3siN40ehAJvdReqBis' });

client.readFile('test.txt', function(error, data) {
        console.log('====Done copying:' + data);
});