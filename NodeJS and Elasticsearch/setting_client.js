var elasticsearch = require('elasticsearch');

// Connect to localhost:9200 and use the default settings
var client = new elasticsearch.Client();

// get the current status of the entire cluster.
// Note: params are always optional, you can just send a callback
client.cluster.health(function (err, resp) {
  if (err) {
    console.error(err.message);
  } else {
	console.log("====1111");
    console.dir(resp);
  }
});

/*
// create
var D = new Date();
var date = parseInt(D.getTime()/1000);
client.create({
	index: 'myindex',
	type: 'mytype',
	// id: '1',
	body: {
		title: 'title',
		tags: 'tags',   
		published: true,
		published_at: date,
	}
}, function (error, response) {
	console.log("====response:" + response);
});
*/

 client.search({
	q: 'title',
}).then(function (body) {
	console.log("====2222");
    console.log(body.hits.hits);
	eventEmitter.emit('doOutput', {message:'okay', hits:body.hits.hits});
}, function (error) {
	console.trace("error :" + error.message);
});

// index a document
/*
client.index({
  index: 'blog',
  type: 'post',
  id: 1,
  body: {
    title: 'JavaScript Everywhere!',
    content: 'It all started when...',
    date: '2013-12-17'
  }
}, function (err, resp) {
	console.log("====2222");
});
*/
/*
// search for documents (and also promises!!)
client.search({
  index: 'blog',
  size: 50,
  body: {
    query: {
      match: {
        profile: 'e'
      }
    }
  }
}).then(function (resp) {
  console.log("====3333");
  var hits = resp.body.hits;
});
*/