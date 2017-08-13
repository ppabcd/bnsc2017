class Tetromino {

	constructor(opt) {
		this.blockSize = 50;

		this.blocks = opt.blocks;

		this.pos = opt.pos || {};
		this.potentialPos  = {
			x: opt.pos.x,
			y: opt.pos.y + 1
		};

		this.landed = false;
	}

	fall() {
		this.pos = {
			x: this.potentialPos.x,
			y: this.potentialPos.y
		};
		this.potentialPos.y++;
	}

	rotate(rotatedBlock) {
		this.blocks = rotatedBlock;
	}

	potentialRotate() {
		let rotatedBlock = this.copyBlock(this.blocks);

		for(let i = 0;i<this.blocks.length;i++) {
			for(let j=0;j<this.blocks[i].length;j++) {

				let newX = j,
					newY = (this.blocks[i].length - 1) - i;

				rotatedBlock[newX][newY] = this.blocks[i][j];
			}
		}

		return rotatedBlock;
	}

	copyBlock(oldBlock) {
		let newBlock = oldBlock.map((block) => {
			return block.slice(0);
		});

		return newBlock;
	}

	draw(ctx) {
		for(let i = 0; i < this.blocks.length; i++) {
			for(let j = 0; j < this.blocks[i].length; j++) {
				if(this.blocks[i][j] != 0) {
					this._draw(ctx, i, j);
				}
			}
		}
	}

	_draw(ctx, i, j) {
		ctx.save();
		ctx.beginPath();

		ctx.translate(this.pos.x * this.blockSize, this.pos.y * this.blockSize);
		ctx.rect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);

		ctx.fillStyle = this.blocks[i][j];

		ctx.fill();
		ctx.stroke();

		ctx.closePath();
		ctx.restore();
	}
}

class Tetris {

	constructor() {
		this.listBlocks = [
			[[0, 1, 0],
			 [1, 1, 0],
			 [0, 1, 0]],
			[[1, 1, 1],
			 [0, 0, 1],
			 [0, 0, 0]],
			[[1, 1, 1],
			 [1, 0, 0],
			 [0, 0, 0]],
			[[0, 1, 0, 0],
			 [0, 1, 0, 0],
			 [0, 1, 0, 0],
			 [0, 1, 0, 0]],
			[[1, 1, 0],
			 [0, 1, 1],
			 [0, 0, 0]],
			[[0, 1, 1],
			 [1, 1, 0],
			 [0, 0, 0]],
			[[1, 1],
			 [1, 1]],
		];

		this.slotX = 10;
		this.slotY = 15;
		this.gameSlot = [];

		this.currentTetromino = null;

		this.reset();

		this.score = 0;
	}

	reset() {
		this.generateGameSlot();

		this.score = 0;

		this.init();
	}

	generateGameSlot() {
		for(let i = 0; i < this.slotY; i++) {
			this.gameSlot[i] = [];
			for(let j = 0; j < this.slotX; j++) {
				this.gameSlot[i].push(0);
			}
		}
	}

	init() {
		this.generateNewTetromino();
	}

	generateNewTetromino() {
		let randomXMin = 2,
			randomXMax = this.slotX - randomXMin;

		let blocks = this.listBlocks[Math.floor(Math.random() * this.listBlocks.length)];
		let newBlock = this.replaceColor(blocks);

		this.currentTetromino = new Tetromino({
			blocks: newBlock,
			pos: {
				x: Math.floor(Math.random() * (randomXMax - randomXMin)) + randomXMin,
				y: 0
			}
		});

		if(!this.check()) {
			gameTetris.loseGame();
		}
	}

	replaceColor(blocks) {
		let color = this.randomColor();

		let newBlock = [];

		for(let i = 0; i < blocks.length; i++) {
			newBlock[i] = [];
			for(let j = 0; j < blocks[i].length; j++) {
				if(blocks[i][j] === 1) {
					newBlock[i][j] = color;
				}else {
					newBlock[i][j] = 0;
				}
			}
		}

		return newBlock;
	}

	randomColor() {
		let rRand = Math.floor(Math.random() * 256),
			gRand = Math.floor(Math.random() * 256),
			bRand = Math.floor(Math.random() * 256);

		return "rgb(" + rRand + "," + gRand + "," + bRand + ")";
	}

	update() {
		this.fall();
	}

	fall() {
		if(this.check()) {
			this.currentTetromino.fall();
		}else {
			this.fillGameSlot();
		}
	}

	check() {
		let flag = true;

		for(let i = 0; i < this.currentTetromino.blocks.length; i++) {
			for(let j = 0; j < this.currentTetromino.blocks[i].length; j++) {
				if(this.currentTetromino.blocks[i][j] != 0) {
					if((i + this.currentTetromino.potentialPos.y) >= this.gameSlot.length) {
						flag = false;
					}else if(this.gameSlot[i + this.currentTetromino.potentialPos.y][j + this.currentTetromino.potentialPos.x] != 0) {
						// the space is taken
						flag = false;
					}
				}
			}
		}

		return flag;
	}

	fillGameSlot() {
		for(let i = 0; i < this.currentTetromino.blocks.length; i++) {
			for(let j = 0; j < this.currentTetromino.blocks[i].length; j++) {
				if(this.currentTetromino.blocks[i][j] != 0) {
					this.gameSlot[i + this.currentTetromino.pos.y][j + this.currentTetromino.pos.x] = this.currentTetromino.blocks[i][j];
				}
			}
		}

		this.checkLines();
	}

	checkLines() {
		for(let i = 0; i < this.gameSlot.length; i++) {
			if(this.gameSlot[i].indexOf(0) == -1) {
				this.gameSlot.splice(i, 1);
				this.gameSlot.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
				this.score++;

				// $("#score span").innerHTML = this.score;

				if(this.score % 10 === 0) {
					this.speedUp();
				}
			}
		}
		this.generateNewTetromino();
	}

	speedUp() {
		gameTetris.clear();
		gameTetris.intervalTime *= 0.85;
		gameTetris.startUpdate();
	}

	draw(ctx) {
		this.currentTetromino.draw(ctx);

		this.drawGameSlot(ctx);
	}

	drawGameSlot(ctx) {
		for(let i = 0; i < this.gameSlot.length; i++) {
			for(let j = 0; j < this.gameSlot[i].length; j++) {
				if(this.gameSlot[i][j] != 0) {
					ctx.beginPath();

					ctx.rect(j * 50, i * 50, 50, 50);

					ctx.fillStyle = this.gameSlot[i][j];

					ctx.fill();
					ctx.stroke();

					ctx.closePath();
				}
			}
		}
	}

	move(direction) {
		let flag = true;
		for(let i = 0; i < this.currentTetromino.blocks.length; i++) {
			for(let j = 0; j < this.currentTetromino.blocks[i].length; j++) {
				if(this.currentTetromino.blocks[i][j] != 0) {
					let potential = {
						x: this.currentTetromino.pos.x + direction,
						y: this.currentTetromino.pos.y
					}

					if(this.gameSlot[i + potential.y][j + potential.x] != 0) {
						console.log('may not move');
						flag = false;
					}
				}
			}
		}

		if(flag) {
			this.currentTetromino.potentialPos = Object.assign({}, {
				x: this.currentTetromino.pos.x + direction,
				y: this.currentTetromino.pos.y
			});

			this.currentTetromino.pos = {
				x: this.currentTetromino.potentialPos.x,
				y: this.currentTetromino.potentialPos.y
			};
		}
	}

	rotate() {
		let potentialRotation = this.currentTetromino.potentialRotate();

		if(this.validateRotation(potentialRotation)) {
			this.currentTetromino.rotate(potentialRotation);
		}else {
			console.log('gak boleh rotate');
		}
	}

	validateRotation(potentialRotation) {
		let flag = true;

		for(let i = 0; i < potentialRotation.length; i++) {
			for(let j = 0; j < potentialRotation[i].length; j++) {
				if(potentialRotation[i][j] != 0) {
					let potential = {
						x: this.currentTetromino.pos.x + j,
						y: this.currentTetromino.pos.y + i
					}

					if(potential.x < 0 || potential.x >= this.slotX || potential.y >= this.slotY || this.gameSlot[potential.y][potential.x] != 0) {
						flag = false;
					}
				}
			}
		}

		return flag;
	}
}

class Game {

    constructor() {
        this.tetris = new Tetris();

        this.lost = false;

		this.close = false;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.cw = canvas.width;
        this.ch = canvas.height;
    }

    reset() {
        this.tetris.reset();

        this.interval = -1;
        this.animationFrameId = -1;
        this.intervalTime = 500;
        this.lost = false;
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
    }
}

// control
window.onkeydown = (e) => {
	gameTetris.clear();

	if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
		e.preventDefault();
	}

	if(!gameTetris.lost) {
        if(e.keyCode === 38) {
            e.preventDefault();
            gameTetris.tetris.rotate();
        }

        if(e.keyCode === 37 || e.keyCode === 39) {
            e.preventDefault();
            let direction = -(38 - e.keyCode);
            gameTetris.move(direction);
        }

        if(e.keyCode === 40) {
            e.preventDefault();
            gameTetris.update();
        }
    }

	if(e.keyCode == 27) {
		gameTetris.close = true;
	}

};

window.onkeyup = (e) => {

    if(!gameTetris.lost) {
        if(e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 40) {
            e.preventDefault();
            gameTetris.startUpdate();
        }
    }
};

//  ============================== MAIN ==============================
const gameTetris = new Game();

export { gameTetris };
