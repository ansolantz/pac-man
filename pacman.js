'use strict'
console.log('pac man')

class PacMan {

  x = 0;
  y = 0;
  canvas;
  lives = 0
  direction = '';
  speed = 1;
  ctx = null;
  moveX = 0;
  moveY = 0;

  imgId = '';
  imgHeight = '';

  img = document.createElement('img');

  constructor(x, y, canvas) {
    console.log('Creating Pack Man');
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.ctx = this.canvas.getContext('2d');

    console.log("Canvas width is ", this.canvas.width);
    console.log("Canvas height is ", this.canvas.height);

    this.img.src = 'img/pacman.gif';

    this.img.querySelector("img")
    this.img.setAttribute('id', 'pacman');
    this.img.setAttribute("width", "32px");
    this.img.setAttribute("height", "32px");

    //console.log('elementbyid ', document.getElementById('pacman').style.height);
    // to do: check width, height on img! 

    this.imgHeight = parseInt(this.img.getAttribute('height'));
    this.imgWidth = parseInt(this.img.getAttribute('width'));

    console.log("Image widthXXXXX: ", this.img.width);
    console.log("Image height XXXXX: ", this.img.height);
    console.log("Image height: ", this.imgHeight);
    console.log("Image width: ", this.imgWidth);
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 50, 50);
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

  checkWall() {
    //  Check wall collision  


    if (this.direction === 'right') {
      if ((this.x + this.imgWidth) >= this.canvas.width) {
        return true;
      }
    } else if (this.direction === 'up') {
      this.moveY = -1;
    } else if (this.direction === 'left') {
      this.moveX = -1;
    } else if (this.direction === 'down') {
      if (this.y + this.imgHeight > this.canvas.height) {
        return;
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



