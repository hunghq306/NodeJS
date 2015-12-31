// run : http://localhost:8080/crawler?domain=ibm.com&type=pdf,txt

var express = require('express');
var util = require('util');
var cheerio = require("cheerio");
var simpleCrawler = require("simplecrawler");

var app = express();
var port = 8080 ;
var resultFile = [];
var outputJSON = [];
var totalPageCrawled = 0;
var startTime = new Date().getTime();

app.get('/crawler', function(req, res) {
    var domain = req.param('domain');
    var types = req.param('type');
    res.send(domain + ' ' + types );
    var typeArr = types.split(",");

    var searchObject = {"domain" : domain, "file_extensions" : JSON.stringify(typeArr)};
    outputJSON.push({"search" : searchObject});

    var url = 'http://' + domain;
    var crawler = simpleCrawler.crawl(url);
    crawler.filterByDomain = true; // only accept inputted domain
    crawler.scanSubdomains = true;

    crawler.on("fetchstart", function(queueItem) {
        totalPageCrawled ++;
        //var currentUrl = queueItem.url;
        //console.log("Starting request for:", currentUrl);
    });

    var arrFile = [];
    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        var contentType = response.headers['content-type'];
        if (inArray(contentType, typeArr)) {
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
            fileInfo(index, fileName,fileUrl, fileReferrerUrl, saveCallBack);
        }
    });

    function saveCallBack(index, friendlyName,fileUrl, fileReferrerUrl) {
        console.log("==saveCallBack :" + friendlyName + "::" + fileUrl + "::" + fileReferrerUrl);
        resultFile.push({"uri" : fileUrl, "source-locations" : JSON.stringify([{"uri" : fileReferrerUrl, "friendly-name" : friendlyName}])});
        if (index == arrFile.length -1) {
            var endTime = new Date().getTime();
            outputJSON.push(resultFile);
            outputJSON.push({"stats" : {"total-pages-crawled" : totalPageCrawled, "spider-start-time" : startTime, "spider-end-time" : endTime }});
            console.log(outputJSON);
        }
    }

    var fileInfo = function(index, fileName, fileUrl, fileReferrerUrl, callback) {
        var myCrawler = simpleCrawler.crawl(fileReferrerUrl);
        myCrawler.maxDepth = 1;
        myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
            var html = responseBuffer.toString();
            var $ = cheerio.load(html);
            var aElement = $('a[href$="'+fileName+'"]'); // risk
            if (aElement) {
                var friendlyName = aElement.html();
                callback(index, friendlyName, fileUrl, fileReferrerUrl);
            }
        });
    }

});

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(needle.indexOf(haystack[i]) != -1)
            return true;
    }
    return false;
}

app.listen(port);
console.log('Server started! At http://localhost:' + port);