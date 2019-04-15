console.log('ghost')

class Ghost {
  x = 0;
  y = 0;
  directionX = 0;
  directionY = 0;
  image = null;

  constructor(x, y, canvas) { }



  draw() {
    // ctx.arc(x, y, radius, startAngle, endAngle)
    //  Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 0, 144)";
    this.ctx.fill();
    this.ctx.closePath();
  }




  update() {

  }

  checkWall() {

  }

}