/* =Elements
 * ------------------------------------------------------------ */
if (World.Element === undefined) World.Element = {};
if (World.Elements === undefined) World.Elements = {};

World.Element.hasType = function(element, elementType) {
	return element && element.type.indexOf(elementType) !== -1;
};

/* Return the number of elements that have a type of elementType */
Elements.hasType = function(elements, elementType) {
	return elements && elements.filter(function(el) {
			return World.Element.hasType(el, elementType);
		}).length;
};
