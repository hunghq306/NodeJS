
// static function
Log.createLogger = function(options) {
  console.log('=== createLogger');
};

function Log(options) {
  console.log('=== constructor');
}

// function belong object - not class
Log.prototype.mute = function() {
  console.log('=== mute');
};

// private function
function mute2() {
  console.log('=== mute 2');
};

// export class
module.exports = Log;