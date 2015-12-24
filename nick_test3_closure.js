
// Closure : inner function that has access to the outer (enclosing) function's variables
var c = 'C is global variable';
var closure = function() {
    c = 'C is changed by Closure';
    var d = 'D in Closure';
    var child_closure = function() {
        c = 'C is changed by Child Closure';
        d = 'D is changed by Child Closure';
        return c;
    }
    console.log(child_closure());
    return d;
}
console.log(closure());
/*
Output :
C is changed by Child Closure
D is changed by Child Closure
*/

// keep value of function's variable
function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}
fn_inside = outside(1); // keep x = 1
result = fn_inside(2); // x = 1, y = 2 => return 3
