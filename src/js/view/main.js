var updateTime = 0.1; /* seconds */

var worldsContainer = document.getElementById("worldsContainer");

var worlds = Data.plans.map(function(plan) {
	var container = document.createElement("DIV");
	container.setAttribute("class", "worldContainer");


	var worldInstance =
		 new LivingWorld(plan, legend, colorLegend, container);

	worldInstance.surface.overlay.addEventListener("click",
						 toggleAnimation.bind(null, worldInstance));

	worldsContainer.appendChild(container);
	return worldInstance;

});

/* =Control animation
 * ------------------------------------------------------------ */
function startAnimation(worlds) {
	worlds = [].concat(worlds);
	worlds.forEach(function(world) {
		if (!world.intervalId)
			world.intervalId = setInterval(
				world.tick.bind(world), updateTime*1000);
	});
}
function stopAnimation(worlds) {
	worlds = [].concat(worlds);
	worlds.forEach(function(world) {
		clearInterval(world.intervalId);
		world.intervalId = null;
	});
}
function toggleAnimation(worlds) {
	worlds = [].concat(worlds);
	/* Decide whether to stop all or start all depending on worlds'
	 *  state */
	var stopped = 0;
	worlds.forEach(function(world) {
		if (!world.intervalId) ++stopped; });
	if (worlds.length / 2 < stopped) startAnimation(worlds);
	else stopAnimation(worlds);
}

/* [ Start animation ]
 * ============================== */
startAnimation(worlds);
