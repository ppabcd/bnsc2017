let isKeyDown = false, isKeyPress = false;

window.onkeydown = (e) => {
	game.clear();

	if(!game.lost) {
        if(e.keyCode === 38) {
            e.preventDefault();
            game.tetris.rotate();
        }

        if(e.keyCode === 37 || e.keyCode === 39) {
            e.preventDefault();
            let direction = -(38 - e.keyCode);
            game.move(direction);
        }

        if(e.keyCode === 40) {
            e.preventDefault();
            game.update();
        }
    }

};

window.onkeyup = (e) => {

    if(!game.lost) {
        if(e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 40) {
            e.preventDefault();
            game.startUpdate();
        }
    }
};

$("#playbtn").onclick = () => {
    $("#ready").classList.remove("show");
    game.init();
};

$("#restart").onclick = () => {
    $("#over").classList.remove("show");
    game.init();
}