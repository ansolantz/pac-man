'use strict'
console.log('level');

class Level {
  canvas;
  levelNumber;
  ctx = null;
  color = "rgb(36, 2, 255)";
  //color = "rgb(14, 2, 248)";

  level1 = [
    { mx: 0, my: 0, dx: 472, dy: 0, w: 8 }, // top border
    { mx: 0, my: 0, dx: 0, dy: 192, w: 8 }, // left upper border
    { mx: 0, my: 192, dx: 100, dy: 192, w: 8 }, // turn right
    { mx: 100, my: 188, dx: 100, dy: 288, w: 8 }, // go down
    { mx: 104, my: 288, dx: 0, dy: 288, w: 8 }, // turn left to teleport point
    { mx: 0, my: 334, dx: 104, dy: 334, w: 8 }, // turn right from teleport point


    // Big blobs
    { mx: 48, my: 64, dx: 96, dy: 64, w: 32 },
    { mx: 136, my: 64, dx: 184, dy: 64, w: 32 },
    { mx: 48, my: 136, dx: 96, dy: 136, w: 32 },
    { mx: 136, my: 136, dx: 184, dy: 136, w: 32 },
  ]

  constructor(canvas, levelNumber) {
    this.canvas = canvas;
    this.levelNumber = levelNumber;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = this.color;

  }

  draw() {
    if (this.levelNumber === 1) {

      this.level1.forEach(element => {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1; //element.w;
        this.ctx.moveTo(element.mx, element.my);
        this.ctx.lineTo(element.dx, element.dy);
        this.ctx.stroke();
      });
      // starting position is x, y
      //Upper border
      // this.ctx.beginPath();
      // this.ctx.moveTo(0, 4);
      // this.ctx.lineTo(472, 4);
      // this.ctx.stroke();

      // //Left upper border
      // this.ctx.beginPath();
      // this.ctx.moveTo(4, 0);
      // this.ctx.lineTo(4, 192);
      // this.ctx.stroke();

      // //Left upper first turn
      // this.ctx.beginPath();
      // this.ctx.moveTo(4, 192);
      // this.ctx.lineTo(4, 192);
      // this.ctx.stroke();

      // //Right upper border
      // this.ctx.beginPath();
      // this.ctx.moveTo(468, 0);
      // this.ctx.lineTo(468, 192);
      // this.ctx.stroke();

      // //Center upper border
      // this.ctx.beginPath();
      // this.ctx.moveTo(236, 8);
      // this.ctx.lineTo(236, 96);
      // this.ctx.stroke();



      // this.ctx.closePath();

      // this.ctx.stroke();
      // this.ctx.closePath();

      // this.ctx.beginPath();
      // this.ctx.moveTo(448, 400);
      // this.ctx.closePath();


      // draw the line that has final coordinates x=100, y=250

      // this.ctx.strokeStyle = this.color;


      // this.ctx.stroke();
      // this.ctx.closePath();

      // this.ctx.beginPath();
      // this.ctx.moveTo(248, 100);
      // this.ctx.lineTo(300, 100);
      // this.ctx.stroke();
      // this.ctx.closePath();

    }

  }

}

