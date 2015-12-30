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
            fileInfo(fileName,fileUrl, fileReferrerUrl, saveCallBack);
        }
    });

    function saveCallBack(friendlyName,fileUrl, fileReferrerUrl) {
        console.log("==saveCallBack :" + friendlyName + "::" + fileUrl + "::" + fileReferrerUrl);

    }

    var fileInfo = function(fileName, fileUrl, fileReferrerUrl, callback) {
        var myCrawler = simpleCrawler.crawl(fileReferrerUrl);
        myCrawler.maxDepth = 1;
        myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
            var html = responseBuffer.toString();
            var $ = cheerio.load(html);
            var aElement = $('a[href$="'+fileName+'"]'); // risk
            if (aElement) {
                var friendlyName = aElement.html();
                callback(friendlyName, fileUrl, fileReferrerUrl);
            }
        });
    }

});


app.listen(port);
console.log('Server started! At http://localhost:' + port);