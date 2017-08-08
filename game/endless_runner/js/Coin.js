class Coin {

	constructor(x, y) {
		this.image = new Image();
		this.image.src = "image/spinning_coin_gold.png";

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

	draw() {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x * this.sourcePos.w, this.sourcePos.y * this.sourcePos.h, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.size, this.size);
		ctx.restore();
	}
}