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