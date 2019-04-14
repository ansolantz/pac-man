'use strict'
console.log('level');

class Level {
  canvas;
  levelNumber;
  ctx = null;

  constructor(canvas, levelNumber) {
    this.canvas = canvas;
    this.levelNumber = levelNumber;

    this.ctx = this.canvas.getContext('2d');
  }

  draw() {
    if (this.levelNumber === 1) {

      // // start the path
      // this.ctx.beginPath();

      // // change the fill style
      // //ctx.fillStyle= "rgb(36, 0, 255)"; 

      // // starting position is x, y
      // this.ctx.moveTo(200, 40);

      // // draw the line that has final coordinates x=100, y=250
      // this.ctx.lineTo(200, 140);
      // this.ctx.strokeStyle = "rgb(36, 0, 255)";
      // this.ctx.lineWidth = 4;

      // this.ctx.stroke();
      // this.ctx.closePath();

      // this.ctx.beginPath();
      // this.ctx.moveTo(198, 40);
      // this.ctx.lineTo(250, 40);
      // this.ctx.stroke();
      // this.ctx.closePath();

    }

  }

}

