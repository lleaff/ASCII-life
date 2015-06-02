function Ai(actor) {
	this.actor = actor;
	this.world = this.actor.world;
}

/* =General
 * ------------------------------------------------------------ */
/**
 *  Move in the same direction the actor was moving in during the last turn
 *  @function keepMoving
 *  @return {Vector} The move vector applied, or null */
Ai.prototype.keepMoving = function() {
	if (this.actor.dir) {
		var longestMove = this.actor.view.look(this.actor.dir)
												.possibleMoves().pop();
		if (longestMove)
			return this.world.actions.move(this.actor, longestMove);
	}
	return null;
};

/**
 * Move the calling actor toward an element of type 'elementType'
 * @function moveToward
 * @param {string} elementType Type of element to go toward
 * @param {Direction} defaultDirection Direction in which to move if
 *   no matching element is found
 * @return {Vector} The move vector applied, or null */
Ai.prototype.moveToward = function(traits, defaultDirection) {
	var reachable = this.actor.view.reachable(traits);
	shuffleArray(reachable); /* Avoid predictable resolution */
	var moveVec = World.View.closest(reachable) || defaultDirection;
	return this.world.actions.move(this.actor, moveVec);
};

Ai.prototype.moveAlong = function(traits, defaultDirection) {
	if (!defaultDirection)
		defaultDirection = this.dir || Direction.random();

	this.moveToward({ types: ["nature" ] });
};
