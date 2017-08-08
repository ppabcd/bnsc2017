class Game {

	constructor() {
		this.dragon = new Dragon();
		this.background = {
			// background a
			backA: new Background("bg_back_A.png", speed - 8),
			frontA: new Background("bg_front_ground_A.png", speed),
			middleA: new Background("bg_middle_A.png", speed - 5),
			superFrontA: new Background("bg_superfront_A.png", speed),
			// background b
			backB: new Background("bg_back_B.png", speed - 8),
			frontB: new Background("bg_front_ground_B.png", speed),
			middleB: new Background("bg_middle_B.png", speed - 5),
			superFrontB: new Background("bg_superfront_B.png", speed),
		}

		// game state
		this.lives = 3;
		this.score = 0;

		this.loop = true;
		this.miliseconds = 0;

		this.coins = [];
		this.obstacles = [];

		this.started = false;
	}

	getReady() {
		let ready = document.getElementById("ready");
		ready.classList.add("show");
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
		ctx.clearRect(0, 0, cw, ch);

		this.background.backA.draw();
		this.background.backB.draw();

		this.background.middleA.draw();
		this.background.middleB.draw();

		this.background.frontA.draw();
		this.background.frontB.draw();

		this.drawObstacles(); // draw obstacles

		this.background.superFrontA.draw();
		this.background.superFrontB.draw();

		this.drawCoins();

		// dragon
		this.dragon.draw();

		// collision
		this.detectCoins();
		this.detectObstacles();

		// game state
		this.drawGameState();
	}

	// game state
	checkLose() {
		if(this.lives === 0) {
			this.loop = false;
			this.showScore();
			this.showGameOverPanel();
			this.started = false;
		}
	}

	drawGameState() {
        ctx.save();
        ctx.beginPath();
        ctx.font = "26px Raleway";
        ctx.fillStyle = "white";

        this.drawLives();
        this.drawScore();

        ctx.closePath();
        ctx.restore();
	}

	drawLives() {
        ctx.fillText("Lives: " + this.lives, 40, 40);
    }

	drawScore() {
		ctx.fillText("Score: " + this.score, 150, 40);
	}

	showScore() {
		let score = document.getElementById("score");
		score.innerHTML = "Your score: " + this.score;
	}

	showGameOverPanel() {
		let over = document.getElementById("over");
		over.classList.add("show");
	}

	// background
	moveBackground() {
		for(let background in this.background) {
			this.background[background].move();
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

	drawCoins() {
		this.coins.forEach((coin) => {
			if(!coin.taken) {
				if(this.miliseconds % 30 === 0) {
					coin.animate();
				}
				coin.draw();
			}
		});
	}

	// obstacles
	generateObstacles() {
		if(this.miliseconds % 3000 === 0) {
			this.obstacles.push(new Obstacle(1200, 0, "image/obstacle/obs_top_B.png"));
			this.obstacles.push(new Obstacle(900, 250, "image/obstacle/obs_btm_B.png"));

			this.obstacles.push(new Obstacle(1800, 0, "image/obstacle/obs_top_B.png"));
			this.obstacles.push(new Obstacle(1500, 250, "image/obstacle/obs_btm_B.png"));
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

	drawObstacles() {
		this.obstacles.forEach((obstacle) => {
			obstacle.draw();
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
	}
}