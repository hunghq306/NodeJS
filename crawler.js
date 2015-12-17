/**
 * Created by USER on 12/16/2015.
 */
var Crawler = require("simplecrawler");

Crawler.crawl("https://www....")
    .on("fetchcomplete", function(queueItem) {
        console.log("Completed fetching resource:", queueItem.url);
    });