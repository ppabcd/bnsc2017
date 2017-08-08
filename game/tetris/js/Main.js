function init() {
	$("#ready").classList.add("show");
	game = new Game(canvas);
}

window.onload = init();