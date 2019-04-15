'use strict';
console.log('candy');

class Candy {
  x = 0;
  y = 0;

  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }


  draw() {
    // ctx.arc(x, y, radius, startAngle, endAngle)
    //  Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(250, 252, 182)";
    this.ctx.fill();
    this.ctx.closePath();
  }



}