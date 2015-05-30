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
