'use strict';
console.log('candy');

class Candy {

  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(250, 252, 182)";
    this.ctx.fill();
    this.ctx.closePath();
  }
}