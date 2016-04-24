/**
 * Created by hunghq on 28/03/2016.
 */

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
console.log('===map :', roots);
// roots is now [1, 2, 3], numbers is still [1, 4, 9]


var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
console.log('===map 2 :', doubles);
// doubles is now [2, 8, 18]. numbers is still [1, 4, 9]