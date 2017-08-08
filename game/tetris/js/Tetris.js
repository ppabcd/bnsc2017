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
			game.loseGame();
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

				$("#score span").innerHTML = this.score;

				if(this.score % 10 === 0) {
					this.speedUp();
				}
			}
		}
		this.generateNewTetromino();
	}

	speedUp() {
		game.clear();
		game.intervalTime *= 0.85;
		game.startUpdate();
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