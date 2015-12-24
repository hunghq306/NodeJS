/**
 * Created by USER on 12/23/2015.
 * Write a function in javascript that given a string (as an example "Sprint654"),
 * it will return the letters as a key, and the numbers as the value.

 */

function getKeyAndValue(str) {
    var value = str.replace(/\D/g, '');
    var key = str.replace(/\d/g, '');

    return {key : key, value : value};
}
console.log(getKeyAndValue("a1"));
