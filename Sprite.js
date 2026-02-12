class Sprite {
    constructor(x, y, w, h, c) {
      this.x = x;
      this.y = y;
      this.dirX = random(-1, 1);
      this.dirY = random(-1, 1);
      this.w = w;
      this.h = h;
      this.c = c;
      this.move = false;
    }
    show() {
      fill(this.c);
      noStroke();
      ellipse(this.x, this.y, this.w, this.h);
    }
    update() {
      // Update the sprite
      if (this.move) {
        this.x += this.dirX;
        this.y += this.dirY;
      }
    }
  }
  