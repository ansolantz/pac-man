'use strict'
console.log('level');

class Level {
  canvas;
  levelNumber;
  ctx = null;
  color = "rgb(36, 2, 255)";
  //color = "rgb(14, 2, 248)";

  constructor(canvas, levelNumber) {
    this.canvas = canvas;
    this.levelNumber = levelNumber;

    this.ctx = this.canvas.getContext('2d');
  }

  draw() {
    if (this.levelNumber === 1) {

      // start the path
      this.ctx.beginPath();

      // change the fill style
      //ctx.fillStyle= "rgb(36, 0, 255)"; 

      // starting position is x, y
      this.ctx.moveTo(250, 100);

      // draw the line that has final coordinates x=100, y=250
      this.ctx.lineTo(250, 240);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 4;

      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.moveTo(248, 100);
      this.ctx.lineTo(300, 100);
      this.ctx.stroke();
      this.ctx.closePath();

    }

  }

}

