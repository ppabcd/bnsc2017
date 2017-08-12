class Background {

	constructor(imgsrc, speed, cw) {
		this.image = new Image();
		this.image.src = "static/image-dragon/background/" + imgsrc;
		this.imgsrc = imgsrc;

		this.width = 800;
		this.height = 480;

		this.desX = null;
		this.desY = 0;

		this.speed = speed;

		this.setDestinationPosition(cw);
	}

	setDestinationPosition(cw) {
		let type = this.imgsrc[this.imgsrc.split(".")[0].length - 1];

		this.desX = 0;
		if(type === 'B') {
			this.desX = cw;
		}
	}

	move(cw) {
		this.desX -= this.speed;

		if(this.desX <= -cw) {
			this.desX = cw;
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, this.width, this.height, this.desX, this.desY, this.width, this.height);
		ctx.restore();
	}
}

class Dragon {

	constructor() {
		this.image = new Image();
		this.image.src = "static/image-dragon/dragon.png";

		this.x = 40;
		this.y = 40;
		this.width = 120;
		this.height = 120;

		this.sourcePos = {
			x: 0,
			y: 0,
			w: 256,
			h: 256
		};

		this.up = false;
		this.gapY = 0;
	}

	animate(ms) {
		if(ms % 30 === 0) {
			this.sourcePos.x++;

			if(this.sourcePos.x === 6 && this.sourcePos.y === 0) {
				this.sourcePos.x = 0;
				this.sourcePos.y = 1;
			}else if(this.sourcePos.x === 6 && this.sourcePos.y === 1) {
				this.sourcePos.x = 0;
				this.sourcePos.y = 0;
			}
		}
	}

	fall() {
		if(!this.up && this.y < 260) {
			this.y += 3;
		}
	}

	goUp() {
		if(this.y > 50) {
			this.up = true;
			this.gapY = 30;
		}
	}

	update() {
		if(this.up && this.gapY) {
			if(this.y > 50) {
				this.y -= 4;
			}

			this.gapY--;
			if(this.gapY === 0) this.up = false;
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x * this.sourcePos.w, this.sourcePos.y * this.sourcePos.h, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}

class Coin {

	constructor(x, y) {
		this.image = new Image();
		this.image.src = "static/image-dragon/spinning_coin_gold.png";

		this.x = x + 1200;
		this.y = y + 120;
		this.size = 24;

		this.taken = false;

		this.sourcePos = {
			x:0,
			y:0,
			w: 32,
			h: 32
		}
	}

	move() {
		this.x -= speed;
	}

	animate() {
		this.sourcePos.x++;

		if(this.sourcePos.x==8) {
			this.sourcePos.x = 0;
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x * this.sourcePos.w, this.sourcePos.y * this.sourcePos.h, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.size, this.size);
		ctx.restore();
	}
}

class Obstacle {

	constructor(x, y, imgsrc) {
		this.x = x;
		this.y = y;
		this.width = 40;
		this.height = 150;

		this.sourcePos = {
			x: 0,
			y: 0,
			w: 33,
			h: 97
		}

		this.collided = false;

		this.image = new Image();
		this.image.src = imgsrc;
	}

	move() {
		this.x -= speed;
	}

	draw(ctx) {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x, this.sourcePos.y, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}

class Game {

	constructor() {
		this.dragon = new Dragon();

		// game state
		this.lives = 3;
		this.score = 0;

		this.loop = true;
		this.miliseconds = 0;

		this.coins = [];
		this.obstacles = [];

		this.started = false;

		this.lost = false;
	}

	setCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.cw = canvas.width;
		this.ch = canvas.height;
	}

	setBackground() {
		this.background = {
			// background a
			backA: new Background("bg_back_A.png", speed - 8, this.cw),
			frontA: new Background("bg_front_ground_A.png", speed, this.cw),
			middleA: new Background("bg_middle_A.png", speed - 5, this.cw),
			superFrontA: new Background("bg_superfront_A.png", speed, this.cw),
			// background b
			backB: new Background("bg_back_B.png", speed - 8, this.cw),
			frontB: new Background("bg_front_ground_B.png", speed, this.cw),
			middleB: new Background("bg_middle_B.png", speed - 5, this.cw),
			superFrontB: new Background("bg_superfront_B.png", speed, this.cw),
		}
	}

	update() {
		this.moveBackground();

		this.generateObstacles();
		this.moveObstacles();

		this.spawnCoins();
		this.moveCoins();

		this.dragon.animate(this.miliseconds);
		this.dragon.fall();
		this.dragon.update();

		this.checkLose();
	}

	draw() {
		let ctx = this.context;
		ctx.clearRect(0, 0, this.cw, this.ch);

		this.background.backA.draw(ctx);
		this.background.backB.draw(ctx);

		this.background.middleA.draw(ctx);
		this.background.middleB.draw(ctx);

		this.background.frontA.draw(ctx);
		this.background.frontB.draw(ctx);

		this.drawObstacles(ctx); // draw obstacles

		this.background.superFrontA.draw(ctx);
		this.background.superFrontB.draw(ctx);

		this.drawCoins(ctx);

		// dragon
		this.dragon.draw(ctx);

		// collision
		this.detectCoins();
		this.detectObstacles();

		// game state
		this.drawGameState(ctx);
	}

	// game state
	checkLose() {
		if(this.lives === 0) {
			this.loop = false;
			this.started = false;
			this.lost = true;
		}
	}

	drawGameState(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.font = "26px Raleway";
        ctx.fillStyle = "white";

        this.drawLives(ctx);
        this.drawScore(ctx);

        ctx.closePath();
        ctx.restore();
	}

	drawLives(ctx) {
        ctx.fillText("Lives: " + this.lives, 40, 40);
    }

	drawScore(ctx) {
		ctx.fillText("Score: " + this.score, 150, 40);
	}

	// background
	moveBackground() {
		for(let background in this.background) {
			this.background[background].move(this.cw);
		}
	}

	// coins
	spawnCoins() {
		if(this.miliseconds % 5000 === 0) {
			for(let i=0;i<3;i++) {
				for(let j=0;j<3;j++) {
					this.coins.push(new Coin(i * 24, j * 24))
				}
			}
		}
	}

	moveCoins() {
		this.coins.forEach((coin, k) => {
			coin.move();
			if(coin.x <= -100) {
				this.coins.splice(k ,1);
			}
		})
	}

	drawCoins(ctx) {
		this.coins.forEach((coin) => {
			if(!coin.taken) {
				if(this.miliseconds % 30 === 0) {
					coin.animate();
				}
				coin.draw(ctx);
			}
		});
	}

	// obstacles
	generateObstacles() {
		if(this.miliseconds % 3000 === 0) {
			this.obstacles.push(new Obstacle(1200, 0, "static/image-dragon/obstacle/obs_top_B.png"));
			this.obstacles.push(new Obstacle(900, 250, "static/image-dragon/obstacle/obs_btm_B.png"));

			this.obstacles.push(new Obstacle(1800, 0, "static/image-dragon/obstacle/obs_top_B.png"));
			this.obstacles.push(new Obstacle(1500, 250, "static/image-dragon/obstacle/obs_btm_B.png"));
		}
	}

	moveObstacles() {
		this.obstacles.forEach((obstacle, k) => {
			obstacle.move();
			if(obstacle.x <= -100) {
				this.obstacles.splice(k, 1);
			}
		});
	}

	drawObstacles(ctx) {
		this.obstacles.forEach((obstacle) => {
			obstacle.draw(ctx);
		});
	}

	// collision
	detectCoins() {
		this.coins.forEach((coin) => {
			if(!coin.taken) {
				if((coin.x - 20) > this.dragon.x
					&& (coin.x + 20) < this.dragon.x + this.dragon.width
					&& (coin.y - 20) > this.dragon.y
					&& (coin.y + 20) < this.dragon.y + this.dragon.height
				) {
					coin.taken = true;
					this.score += 10;
				}
			}
		});
	}

	detectObstacles() {
		this.obstacles.forEach((obstacle) => {
			if(!obstacle.collided) {
				// top obstacle
				if(obstacle.y === 0) {
					if((obstacle.y + obstacle.height - 35) > this.dragon.y
						&& obstacle.x < this.dragon.x + this.dragon.width
						&& obstacle.x + obstacle.width > this.dragon.x + this.dragon.width
					) {
						obstacle.collided = true;
						this.lives--;
					}
				}else {
				// bottom obstacle
					if((obstacle.y + 20 < this.dragon.y + this.dragon.height
						&& obstacle.y + 20 > this.dragon.y
						&& obstacle.x < this.dragon.x + this.dragon.width
						&& obstacle.x + obstacle.width > this.dragon.x + this.dragon.width
						) || (
							this.dragon.x > obstacle.x
							&& this.dragon.x < obstacle.x + obstacle.width
							&& this.dragon.y > obstacle.y
							&& this.dragon.y < obstacle.y + obstacle.height
						)
					) {
						obstacle.collided = true;
						this.lives--;
					}
				}
			}
		});
	}

	// reset
	reset() {
		speed = 10;
		this.lives = 3;
		this.score = 0;
		this.loop = true;
		this.coins = [];
		this.obstacles = [];
		this.started = true;
		this.lost = false;
	}
}

let speed = 10;

const game = new Game();

// functional
function startGame() {
	if(!game.started) {
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

export { game, startGame, play }
