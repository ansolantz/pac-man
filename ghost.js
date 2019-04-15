console.log('ghost')

class Ghost {
  x = 0;
  y = 0;
  directionX = 0;
  directionY = 0;
  image = null;

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
    this.ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 0, 144)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x - 6, this.y - 6, 3, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x + 6, this.y - 6, 3, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fill();
    this.ctx.closePath();


  }



  update() {



  }

  checkWall() {

  }

}