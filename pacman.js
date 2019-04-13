'use strict'
console.log('pac man')

class PacMan {

  x = 0;
  y = 0;
  canvas;
  lives = 0
  direction = '';
  speed = 2;  //speed 1, 2, 4, 8, 32
  ctx = null;
  moveX = 0;
  moveY = 0;
  pacManRadius = 16;

  animationCounter = 0;
  animationMaxValue = 14;

  imgId = '';
  imgHeight = '';
  img = document.createElement('img');

  constructor(x, y, canvas) {
    console.log('Creating Pack Man');
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.ctx = this.canvas.getContext('2d');

    // console.log("Canvas width is ", this.canvas.width);
    // console.log("Canvas height is ", this.canvas.height);

    this.img.src = 'img/pacman.gif';

    this.img.querySelector("img")
    this.img.setAttribute('id', 'pacman');
    this.img.setAttribute("width", "32px");
    this.img.setAttribute("height", "32px");

    //console.log('elementbyid ', document.getElementById('pacman').style.height);
    // to do: check width, height on img! 

    // this.imgHeight = parseInt(this.img.getAttribute('height'));
    // this.imgWidth = parseInt(this.img.getAttribute('width'));

    // console.log("Image widthXXXXX: ", this.img.width);
    // console.log("Image height XXXXX: ", this.img.height);
    // console.log("Image height: ", this.imgHeight);
    // console.log("Image width: ", this.imgWidth);
  }

  update() {

    if (this.checkWall()) {
      console.log('has hit wall');
      return;
    }
    this.moveX = 0;
    this.moveY = 0;

    if (this.direction === 'right') {
      this.moveX = 1;
    } else if (this.direction === 'up') {
      this.moveY = -1;
    } else if (this.direction === 'left') {
      this.moveX = -1;
    } else if (this.direction === 'down') {
      this.moveY = 1;
    }
    this.y = this.y + this.moveY * this.speed;
    this.x = this.x + this.moveX * this.speed;

  }

  draw() {
    //this.ctx.drawImage(this.img, this.x, this.y, 50, 50);


    // ctx.arc(x, y, radius, startAngle, endAngle)
    //  Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle



    if (this.animationCounter < this.animationMaxValue / 2) {
      //Pac man close mouth
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.pacManRadius, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgb(255, 255, 0)";
      this.ctx.fill();
      this.ctx.beginPath();

      this.ctx.lineTo(this.x, this.y);
      this.ctx.fillStyle = "rgb(255, 255, 0)";
      this.ctx.fill();

      //eye
      this.ctx.beginPath();
      this.ctx.arc(this.x - 2, this.y - 8, 2.5, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.fill();


    } else {
      //Pac Man open mouth
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.pacManRadius, 0.25 * Math.PI, 1.25 * Math.PI, false);
      this.ctx.fillStyle = "rgb(255, 255, 0)";
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.pacManRadius, 0.75 * Math.PI, 1.75 * Math.PI, false);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(this.x - 3, this.y - 8, 3, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.fill();

    }
    this.animationCounter++;
    // if (this.animationCounter === 16) {
    //   this.animationCounter = 0;
    // }
    this.animationCounter = this.animationCounter % this.animationMaxValue;




    // this.ctx.fillStyle = 'blue';
    // this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);

  }


  checkWall() {
    //  Check wall collision  


    if (this.direction === 'right') {

      console.log("Canvas width is ", this.canvas.width);
      console.log("Canvas height is ", this.canvas.height);
      console.log("x + pacman radius ", this.x + this.pacManRadius)
      if (this.x + this.pacManRadius + this.speed >= parseInt(this.canvas.width)) {
        return true;
      }
    } else if (this.direction === 'up') {
      if (this.y - this.pacManRadius <= 0) {
        return true;
      }
    } else if (this.direction === 'left') {
      if (this.x - this.pacManRadius <= 0) {
        return true;
      }
    } else if (this.direction === 'down') {
      if (this.y + this.pacManRadius + this.speed >= parseInt(this.canvas.height)) {
        return true;
      }
    }

  }

  setDirection(newDirection) {
    this.direction = newDirection;
  }

  setLives() {
    this.lives--;
    console.log(this.lives)
  }
}



