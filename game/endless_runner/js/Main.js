function init() {
	game = new Game();

	game.getReady();
}

function startGame() {
	if(!game.started) {
		let ready = document.getElementById("ready");
		ready.classList.remove("show");

		setInterval(function() {
			speed += 2;
		}, 4000);

		game.reset();
		play();
	}
}

function play() {
	game.update();
	game.draw();

	if(game.loop) {
		game.miliseconds += 20;
		setTimeout(play, 20);
	}
}

canvas.addEventListener("click", () => {
	game.dragon.goUp();
});

restart.addEventListener("click", () => {
	let over = document.getElementById("over");
	over.classList.remove("show");

	startGame();
});

playbtn.addEventListener("click", () => {
	startGame();
})

window.onload = init();