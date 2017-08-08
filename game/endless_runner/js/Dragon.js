class Dragon {

	constructor() {
		this.image = new Image();
		this.image.src = "image/dragon.png";

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

	draw() {
		ctx.save();
		ctx.drawImage(this.image, this.sourcePos.x * this.sourcePos.w, this.sourcePos.y * this.sourcePos.h, this.sourcePos.w, this.sourcePos.h, this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}