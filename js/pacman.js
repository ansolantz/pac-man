'use strict'
console.log('pac man')

class PacMan {


  constructor(x, y, canvas, candyEatenCallback, pacManHitGhostCallback) {
    console.log('Creating Pack Man');
    this.x = x;
    this.y = y;
    this.candyEatenCallback = candyEatenCallback;
    this.pacManHitGhostCallback = pacManHitGhostCallback;

    this.lives = 3;
    this.direction = null;
    this.wantedDirection = null;
    this.speed = 2;  //speed 1, 2, 4, 8, 32
    this.moveX = 0;
    this.moveY = 0;
    this.pacManRadius = 16;  //Orginal size change back if start bugging
    this.isMouthClosing = true;
    this.color = 'rgb(255, 255, 1)'

    this.animationCounter = 0;
    this.animationMaxValue = 0.24;  //Controles the animation of PacMans mouth
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  update() {
    if (this.direction === null) {
      return;
    }

    // if (this.checkWall()) {
    //   // console.log('has hit wall');
    //   return;
    // }

    if (this.direction !== this.wantedDirection) {
      if (this.checkIfCanMove(this.wantedDirection)) {
        this.direction = this.wantedDirection;
      }
    }


    if (!this.checkIfCanMove(this.direction)) {
      return;
    }

    this.checkTelePort()

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

  startImmortal() {
    //Pac man is immortal
    this.color = 'rgb(254, 254, 233)';
    console.log('immortal!');
    setTimeout(() => {
      this.color = 'rgb(255, 255, 1)';
      console.log('Not immortal!');
    }, 5000);
  }

  hidePackMan() {
    this.x = -100;
    this.y = -100;
  }

  draw() {
    // this.ctx.drawImage(this.img, this.x, this.y, 50, 50);
    // ctx.arc(x, y, radius, startAngle, endAngle)
    // Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle

    let arcStart = 0;
    let arcEnd = 0;

    this.ctx.beginPath();

    if (this.direction === 'right') {
      arcStart = 0.25;
      arcEnd = 1.75;
    } else if (this.direction === 'up') {
      arcStart = 1.75;
      arcEnd = 1.25;
    } else if (this.direction === 'left') {
      arcStart = 1.25;
      arcEnd = 0.75;
    } else if (this.direction === 'down') {
      arcStart = 0.75;
      arcEnd = 0.25;
    } else {
      //Staring case when no direction is set
      arcStart = 0.15;
      arcEnd = 1.85;
    }

    if (this.direction) {
      if (this.isMouthClosing) {
        this.ctx.arc(this.x, this.y, this.pacManRadius, (arcStart - this.animationCounter) * Math.PI,
          (arcEnd + this.animationCounter) * Math.PI);
      } else {
        arcStart = arcStart - this.animationMaxValue;
        arcEnd = arcEnd + this.animationMaxValue;

        this.ctx.arc(this.x, this.y, this.pacManRadius, (arcStart + this.animationCounter) * Math.PI,
          (arcEnd - this.animationCounter) * Math.PI);
      }
      this.ctx.lineTo(this.x, this.y);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();

      this.animationCounter = this.animationCounter + 0.01;
      if (this.animationCounter >= this.animationMaxValue) {
        this.animationCounter = 0;
        // if (this.isMouthClosing) {
        //   this.isMouthClosing = false;
        // } else{
        //   this.isMouthClosing = true;
        // }
        this.isMouthClosing = !this.isMouthClosing;
      }

    } else {
      this.ctx.arc(this.x, this.y, this.pacManRadius, (arcStart - this.animationCounter) * Math.PI,
        (arcEnd + this.animationCounter) * Math.PI);

      this.ctx.lineTo(this.x, this.y);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }

    // Drawing packMan's eye ---------
    this.ctx.beginPath();
    if (this.direction === 'right' || this.direction === 'left') {
      this.ctx.arc(this.x, this.y - 8, 2.5, 0, 2 * Math.PI);
    } else if (this.direction === 'up' || this.direction === 'down') {
      this.ctx.arc(this.x - 8, this.y, 2.5, 0, 2 * Math.PI);
    } else {
      this.ctx.arc(this.x, this.y - 8, 2.5, 0, 2 * Math.PI);
    }
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fill();
    this.ctx.closePath();
    //---------------------------------


  }



  //To do Check if thiscan be improved since it does two things.
  checkIfCanMove(direction) {
    let imageData = [];
    let pixelArray = [];
    let candyLoactionX = this.x;
    let candyLocationY = this.y;
    //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
    //Cutting out an array of pixels in front of PacMan for each move depending on direction.
    if (direction === 'right') {
      imageData = this.ctx.getImageData(this.x + this.pacManRadius, this.y - this.pacManRadius, 1, this.pacManRadius * 2);
      candyLoactionX = candyLoactionX + this.pacManRadius;
    } else if (direction === 'up') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, this.pacManRadius * 2, -1);
      candyLocationY = candyLocationY - this.pacManRadius;
    } else if (direction === 'left') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, -1, this.pacManRadius * 2);
      candyLoactionX = candyLoactionX - this.pacManRadius;
    } else if (direction === 'down') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y + this.pacManRadius, this.pacManRadius * 2, 1);
      candyLocationY = candyLocationY + this.pacManRadius;
    } else {
      console.log('Error direction ', this.direction, '  not defined.')
    }

    pixelArray = imageData.data;
    const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);
    if (nextMoveValue === 0) {
      return true;
    }


    if (this.checkColor(250, 252, 182, pixelArray)) {
      //console.log('Yummy!');
      this.candyEatenCallback(candyLoactionX, candyLocationY); // Calls candyFound() in games.js
      return true;
    } else if (this.checkColor(20, 20, 255, pixelArray)) {
      // Border color "rgb(20, 20, 255)";;
      return false;
    } else if (this.checkColor(255, 138, 170, pixelArray) ||
      this.checkColor(36, 180, 237, pixelArray) ||
      this.checkColor(244, 10, 29, pixelArray) ||
      this.checkColor(244, 132, 3, pixelArray)) {
      // Ghost colors 
      // 'rgb(255, 138, 170';
      // 'rgb(36, 180, 237'
      // 'rgb(244, 10, 29'
      // 'rgb(244, 132, 3'

      this.pacManHitGhostCallback(); // Calls pacmanHitGhost() in games.js

      //this.startLostLifeTimer();
      return false;
    } else {
      return (nextMoveValue === 0);
    }

  }

  checkColor(rgbNumber1, rgbNumber2, rgbNumber3, pixelArray) {
    let found = false;
    for (var i = 0; i < pixelArray.length; i++) {
      if (pixelArray[i] === rgbNumber1 && pixelArray[i + 1] === rgbNumber2 && pixelArray[i + 2] === rgbNumber3) {
        found = true;
        break;
      }
    }
    return found;
  }

  checkTelePort() {

    if (this.direction === 'right') {
      if (this.x + this.pacManRadius + this.speed >= parseInt(this.canvas.width)) {
        this.x = this.pacManRadius * 2 - 1;
      }
    } else if (this.direction === 'left') {
      if (this.x - this.pacManRadius <= 0) {
        this.x = 476 - this.pacManRadius * 2 + 1;
      }
    }

  }

  setWantedDirection(newDirection) {
    this.wantedDirection = newDirection;
    if (this.direction == null) {
      this.direction = this.wantedDirection;
    }
  }

  setStartPosition() {
    // this.x = 25;
    // this.y = 25;
    this.x = 25;
    this.y = 215
    this.isMouthClosing = true;
    this.animationCounter = 0;
    this.direction = null;
  }

  lifeLost() {
    this.lives--;
    console.log('Life: ', this.lives)
  }


}

