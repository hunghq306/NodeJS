
/*
Object : stores key-value pairs;
 */
var comment = {
    title : "init title",
    addComment : function(){
        this.title = "title after add comment";
    }
};
console.log(comment.title); // output : init title
comment.addComment(); // run function addComment
console.log(comment.title); // output : title after add comment