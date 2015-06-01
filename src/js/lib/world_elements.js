/* =Elems
 * ------------------------------------------------------------ */
if (Elem === undefined) var Elem = {};
if (Elems === undefined) var Elems = {};

/* Returns vectors relative to 'view'.position to cells whose elements
 *  satisfy the condition given in 'traits', or null if none does.
 *  'range' (default: 1) is the distance to scan. */
Elem.nextTo = function(view, traits, range) {
	var vectors = [];
	if (range === undefined) range = 1;
	Direction.forEach(function(direction) {
		for (var i = 0, vector; i < range; ++i) {
			vector = view.position.plus(
				direction.times(new Vector(range, range)));
			if (Elem.match(view.world.grid.get(vector)), traits)
				vectors.push(vector);
		}
	});
	return vectors[0] === undefined ? null : vectors;
};

/* Test the given array of elements for caracteristic given in 'traits'.
 *  'traits' properties can be any supported element property as key
 *  name, and the expected value as value.
 *
 * eg.: Avoid cells with solid animals:
 *             !Elems.match(world.grid.get(vector),
 *                           { types: ["animal"], solid: true }) */
Elems.match = function(elements, traits) {
	if (traits.types && !Elems.hasTypes(elements, traits.types)) {
		return false; }
	if (traits.solid && !Elems.isSolid(elements, traits.solid)) {
		return false; }
	return true; /* If all conditions pass, return true */
};

/* =Test functions
 * ------------------------------ */
/* Return the number of elements that satisfy the given test function */
Elems._test = function(callback, elements) {
	return elements && elements.filter(callback(elem)).length;
};


/* types */
Elem.hasType = function(elementType, elem) {
	return elem && elem.types.indexOf(elementType) !== -1;
};
Elems.hasType = function(elements, elementType) {
	return Elems._test(Elem.hasType.bind(null, elementType));
};
Elem.hasTypes = function(elementTypes, elem) {
	return elem &&
		elementTypes.every(Elem.hasType.bind(null, elementTypes));
};
Elems.hasTypes = function(elements, elementTypes) {
	return Elems._test(Elem.hasTypes.bind(null, elementTypes));
};

/* solid */
Elem.isSolid = function(value, elem) {
	return elem && elem.solid === (value === false ? false : true);
};
Elems.isSolid = function(elements, value) {
	return Elems._test(Elem.isSolid.bind(null, value));
};

/* blockSight */
Elem.blockSight = function(value, elem) {
	return elem && elem.blockSight === (value === false? false : true);
};
Elems.blockSight = function(elements, value) {
	return Elems._test(Elem.blockSight.bind(null, value));
};
