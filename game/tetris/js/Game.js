class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.cw = canvas.width;
        this.ch = canvas.height;

        this.tetris = new Tetris();

        // this.interval = -1;
        // this.animationFrameId = -1;
        //
        // this.intervalTime = 500;
        //
        // this.lost = false;
    }

    reset() {
        this.tetris.reset();

        this.interval = -1;
        this.animationFrameId = -1;
        this.intervalTime = 500;
        this.lost = false;

        console.log(this.intervalTime);
    }

    init() {
        this.reset();

        this.play();

        this.startUpdate();
    }

    play() {
        this.draw();

        this.animationFrameId = requestAnimationFrame(this.play.bind(this));
    }

    update() {
        if(!this.lost) this.tetris.update();
    }

    draw() {
        let ctx = this.context;
        ctx.clearRect(0, 0, this.cw, this.ch);

        this.tetris.draw(ctx);
    }

    move(direction) {
        this.tetris.move(direction);
    }

    goDown() {
        this.tetris.goDown();
    }

    clear() {
        clearInterval(this.interval);
        this.interval = -1;
    }

    startUpdate() {
        if(this.interval == -1) {
            let _this = this;

            this.interval = setInterval(() => {
                _this.update();
            }, this.intervalTime);
        }
    }

    loseGame() {
        this.lost = true;

        this.clear();

        this.showGameOverPanel();
    }

    showGameOverPanel() {
        $("#score-over").innerHTML = "Your score: " + this.tetris.score;
        $("#over").classList.add("show");
    }
}