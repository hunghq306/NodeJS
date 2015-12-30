// run : http://localhost:8080/crawler?domain=ibm.com&type=pdf

var express = require('express');
var util = require('util');
var cheerio = require("cheerio");
var simpleCrawler = require("simplecrawler");
var app = express();
var port = 8080 ;

app.get('/crawler', function(req, res) {
    var domain = req.param('domain');
    var type = req.param('type');
    res.send(domain + ' ' + type );

    var url = 'http://' + domain;
    var crawler = simpleCrawler.crawl(url);
    crawler.filterByDomain = true; // only accept inputted domain
    crawler.scanSubdomains = true;
/*
    crawler.on("fetchstart", function(queueItem) {
        var currentUrl = queueItem.url;
        console.log("Starting request for:", currentUrl);
    });
*/
    var arrFile = [];
    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        var contentType = response.headers['content-type'];
        if (contentType.indexOf(type) != -1) {
            var fileUrl = queueItem.url;
            var fileReferrerUrl = queueItem.referrer;
            var fileObject = {'fileUrl':fileUrl, 'fileReferrerUrl':fileReferrerUrl};
            arrFile.push(fileObject);
        }
    });

    crawler.on("complete", function() {
        console.log("==== Finished!");
        for (var index = 0; index < arrFile.length; index++) {
            var fileObject = arrFile[index];
            var fileUrl = fileObject.fileUrl;
            var fileReferrerUrl = fileObject.fileReferrerUrl;
            var fileUrlArr = fileUrl.split("/");
            var fileName = fileUrlArr[fileUrlArr.length - 1];
            console.log("===== pdf file : " + fileName + "::" + fileUrl + "::" + fileReferrerUrl);
            var friendlyName = "";
            var subCrawler = simpleCrawler.crawl(fileReferrerUrl);
            subCrawler.maxDepth = 1;
            subCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
                var html = responseBuffer.toString();
                console.log("==html:" + html);
                var $ = cheerio.load(html);
                console.log("==fileName:" + fileName);
                var aElement = $('a[href$="'+fileName+'"]'); // :first
                if (aElement) {
                    friendlyName = aElement.html();
                    console.log("==friendlyName :" + friendlyName);
                }
            });
        }
    });

    parameters = {};   //define parameters
    first(parameters); // call first function to kick things off.
    var first = function(parameters) {
        request(parameters,function(error, response, data){
            newParamters = date.something;
            second(newParamters, data); //call second function
        });
    };

    var second = function(newParamters, data){
        request(newParamters,function(error, response, data){
            res.redirect(data.info.url);
        });
    }


});


app.listen(port);
console.log('Server started! At http://localhost:' + port);