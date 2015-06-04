/* =Functions
 * ------------------------------------------------------------ */
/* Same as Function.prototype.bind, except you can specify a "hole" in
 *  the predefined arguments with the '___' object */
window.___ = {};
Function.prototype.partial = function(thisArg) {
	var args = arguments;
	var fn = this;
	return function() {
		var argList = [];
		for (var i = 1, j = 0;
			 i < args.length || j < arguments.length; ++i) {
			if (args[i] === window.___) {
				argList[i - 1] = arguments[j++];
			} else {
				/* If all the arguments from 'args' have been added,
				 *  begin taking the excess arguments */
				argList[i - 1] = i >= args.length ?
					arguments[j++] : args[i];
			}
		}
		return fn.apply(thisArg, argList);
	};
};

/* =Array
 * ------------------------------------------------------------ */
function shuffleArray(arr) {
	for (var i = 0, len = arr.length, visited = []; i < len; ++i) {
		if (visited.indexOf(i) !== -1) continue;
		var rand = Math.random()*len>>0;
		visited.push(rand);
		
		var tmp = arr[i];
		arr[i] = arr[rand];
		arr[rand] = tmp;
	}
}

/* =Random
 * ------------------------------------------------------------ */
/* 'lo' and 'up' included */
function randomInt(lo, up) {
	var range = up - lo;
	return Math.round(Math.random()*range + lo) >>0;
}

function randomArrayElement(arr) {
	return randomInt(0, arr.length - 1);
}

/* =Assert
 * ------------------------------------------------------------ */
function assert(condition, failureString) {
	if (!condition) {
		if (window.DEBUG)
			throw new Error(failureString);
		else
			console.log("ERROR: "+failureString);
	}
}
