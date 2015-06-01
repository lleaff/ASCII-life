/* =World perception
 * ------------------------------------------------------------ */
World.View = function(world, actor, position) {
	this.world = world;
	this.actor = actor;
	this.position = position;
};

/* Creates a new view by applying 'vector' to actor's '.position' */
World.View.prototype.New = function(vector) {
	return new World.View(this.world, this.actor, this.position.plus(vector));
};

World.View.prototype.isTrapped = function() {
	var exit = 0;
	return !Direction.some(function(dir) {
		var cell = this.world.grid.get(this.position.plus(dir));
		return (cell && !cell.some(function(el) { 
			return el.solid; })) || false;
	}, this);
};

World.View.prototype.isOn = function(traits) {
	return Elems.match(
		this.world.grid.get(this.position), traits);
};

/* Returns vectors to positions in all directions containing element
 *  matching 'traits' */
World.View.prototype.reachable = function(traits, distance) {
	var vectors = [];
	var self = this;
	Direction.forEach(function(direction) {
		vectors = vectors.concat(
			self.look(direction, distance || self.actor.speed)
											   .reachable(traits));
	}, this);
	return vectors;
};

/* Returns vectors to positions in all directions containing element
 *  of 'elementType' */
World.View.prototype.visible = function(traits) {
	var vectors = [];
	var self;
	Direction.forEach(function(direction) {
		vectors.concat(self.look(direction).visible(traits));
	});
	return vectors;
};

/* The 'sight' argument can be used to overide the actor's sight
 * property, to get images for use in non-sight related actions */
World.View.prototype.look = function(direction, sight) {
	var image = []; /* Array of elements */
	var nonVisual;
	if (sight === undefined) {
		sight = this.actor.sight;
		nonVisual = false;
	} else {
		nonVisual = true; }

	var position = this.position;
	for (var distance = 0, element; distance < sight;
		 ++distance) {
		elements = this.world.grid.get(position.plus(direction));
		image.push(elements);
		if (!elements || (!nonVisual &&
			elements.some(function(el) { return el.blockSight; })))
			break;
	}
	return new World.View.Image(image, direction);
};

World.View.Image = function(image, direction) {
	this.image = image;
	this.direction = direction;
};

/* Helper function */
Object.defineProperty(World.View.Image.prototype, "_addDirection", {
	enumerable: false, writable: false,
	value: function(vectorsArray, i) {
		vectorsArray.push(this.direction.plus(new Vector(i, i))); }
}); 

/* Returns vectors to positions containing element matching 'traits' */
World.View.Image.prototype.reachable = function(traits) {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (Elems.match(this.image[i], traits))
			this._addDirection(vectors, i);
		if (Elems.isSolid(this.image[i]))
			break;
	}
	return vectors;
};

/* Returns vectors to positions containing element matching 'traits' */
World.View.Image.prototype.visible = function(traits) {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (Elems.match(this.image[i], traits))
			this._addDirection(vectors, i);
	}
	return vectors;
};

/* Possible move vectors */
World.View.Image.prototype.possibleMoves = function() {
	var vectors = [];
	for (var i = 0; i < this.image.length; ++i) {
		if (this.image[i] === undefined || Elems.isSolid(this.image[i]))
			break;
		else this._addDirection(vectors, i);
	}
	return vectors;
};

/* =Array of vectors
 * ------------------------------------------------------------ */
World.View.closest = function(vectors) {
	return vectors.reduce(function(a, b) {
		return a ? (a.x+a.y < b.x+b.y ? a : b) : b; }, null);
};

World.View.farthest = function(vectors) {
	return vectors.reduce(function(a, b) {
		return a ? (a.x+a.y > b.x+b.y ? a: b) : b; }, null);
};
