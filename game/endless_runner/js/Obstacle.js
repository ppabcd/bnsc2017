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

	draw() {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x, this.sourcePos.y, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}