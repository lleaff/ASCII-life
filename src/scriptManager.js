/* --------------------------------- *
 *  /!\ Use only in development /!\
 * --------------------------------- */
(function loadScripts(scripts, callback) {
	var body = document.body;
	if (callback === undefined) callback = "main";

	function loadScript(scripts) {
		var source = scripts.shift();
		if (source === undefined) return;

		var script = document.createElement("script");
		body.appendChild(script);
		script.setAttribute("src", source);
		var scriptCallback = scripts[0] ?
			loadScript.bind(null, scripts) :
			function() {window[callback]();};
		script.addEventListener("load", scriptCallback);
	}
	loadScript(scripts);
})([
	"lib/miscHelperFunctions.js",
	"lib/vector.js",
	"lib/grid.js",
	"lib/world.js",
	"lib/world_logic.js",
	"lib/world_directions.js",
	"lib/world_perception.js",
	"lib/ai.js",
	"data/legend.js",
	"view/color.js",
	"data/plans.js",
	"view/animate.js",
	"view/main.js"
].map(function(scriptName) {
	return "js/"+scriptName;
}));
