/*
 Callback : pass a function as an argument in another function and later execute that passed-in function
 or even return it to be executed later.
 */

function goHome(vehicle, callback) {
    console.log("I'm going home by " + vehicle);
    callback();
}

function playGame() {
    console.log("I'm playing game");
}
goHome("motobike", playGame); // playGame is a function;
/*
Output :
 I'm going home by motobike
 I'm playing game
 */

// use callback in AJAX :
$.get('ajax/test.html', function(data) {
    console.log("Data :" + data);
});


