/**
 * Created by hunghq on 28/03/2016.
 */

function isBigEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log('====filter :', filtered);



