var Dropbox = require("dropbox");

var client = new Dropbox.Client({ token: '4oodBJjnQhMAAAAAAAAAI3jXFReaxPiHcZSiijY--RNqcw3siN40ehAJvdReqBis' });

client.getAccountInfo(function (err, data) {
  if (err) console.log('=====Error: ' + err)
  else console.log("====== data :" + data.display_name + ', ' + data.email)
});