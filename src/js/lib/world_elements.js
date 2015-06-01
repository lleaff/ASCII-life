/* =Elems
 * ------------------------------------------------------------ */
if (Elem === undefined) var Elem = {};
if (Elems === undefined) var Elems = {};

Elem.nextTo = function() {
	/* TODO */
};

Elem.match = function(elements, traits) {
	if (traits.types && !Elems.hasTypes(elements, traits.types)) {
		return false; }
	if (traits.solid && !Elems.isSolid(elements, traits.solid)) {
		return false; }
	return true; /* If all conditions pass, return true */
};


/* Return the number of elements that satisfy the given test function */
Elems._test = function(callback, elements) {
	return elements && elements.filter(callback(elem)).length;
};

/* =Test functions
 * ------------------------------ */

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
