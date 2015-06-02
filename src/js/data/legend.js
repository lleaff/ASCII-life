var colorLegend = {
	wall:		[ "wall" ],
	nature:		[ "plant", "flower" ],
	character:	[ "critter", "bouncingCriter" ],
	animal:		[ "wallHugger" ]
};

var legend = (function() {
	var legend = {
		EmptySpace: {
			name:		"emptySpace",
			types:		[ "floor" ],
			ch:			" ",
		},

		Wall: {
			name:		"wall",
			types:		[ "obstacle" ],
			ch:			"#",
			solid:		true,
			blockSight:	true,
		},

		Plant: {
			name:		"plant",
			types:		[ "vegetal" ],
			ch:			"+"
		},

		Flower: {
			name:		"flower",
			types:		[ "vegetal" ],
			ch:			"*"
		},

		Critter: {
			name:		"critter",
			types:		[ "animal" ],
			ch:			"o",
			solid:		true,
			speed:		1,
			sight:		1,
		},

		BouncingCriter: {
			name:		"bouncingCriter",
			types:		[ "animal" ],
			ch:			"@",
			solid:		true,
			act:		bouncingCriterAct,
			speed:		1,
			sight:		1,
		},

		WallHugger: {
			name:		"wallHugger",
			types:		[ "animal" ],
			ch:			"~",
			solid:		true,
			act:		wallHuggerAct,
			speed:		1,
			sight:		1,
		}
	};

	legend.default = legend.EmptySpace;

	function critterAct() {
	
	}

	function bouncingCriterAct() {
		if (!this.view.isTrapped()) {
			while (!this.dir || !this.ai.keepMoving())
				this.dir = Direction.random();
		}
	}

	function wallHuggerAct() {
		if (!this.view.isTrapped()) {
			if (!this.dir) this.dir = Direction.random();
			//if (!this.view.look(this.dir).possibleMoves()[0]) {
			this.ai.moveAlong(this.dir);
			//}
		}
	}

	return legend;
})();
