'use strict'

class Ghost {
  constructor(x, y, canvas, color, ghostHitPacmanCallback) {
    this.x = x;
    this.y = y;

    this.direction = '';
    this.moveX = 0;
    this.moveY = 0;
    this.ghostRadius = 16;  // original size
    this.speed = 1;  //speed 1, 2, 4, 8, 32
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.color = color;
    this.ghostHitPacmanCallback = ghostHitPacmanCallback;
    this.randomDirection();
  }


  draw() {

    // ctx.arc(x, y, radius, startAngle, endAngle)
    //  Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ghostRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();


    // Drawing ghost eyes's -------------
    this.ctx.beginPath();
    this.ctx.arc(this.x - 6, this.y - 6, 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x + 6, this.y - 6, 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fill();
    this.ctx.closePath();

    //--Inner eye's ----------------------
    this.ctx.beginPath();
    this.ctx.arc(this.x - 6, this.y - 8, 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x + 6, this.y - 8, 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fill();
    this.ctx.closePath();
    //----------------------------------


    //--Lower Body --------------------

    this.ctx.beginPath();
    this.ctx.arc(this.x - 9, this.y + 11, 6, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y + 11, 6, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.x + 9, this.y + 11, 6, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    ///------------------------------

  }


  randomDirection() {
    //--- Random ghost direction ---//
    let directions = ['right', 'up', 'left', 'down'];
    let randomDirectionIndex = Math.floor((Math.random() * directions.length));
    this.direction = directions[randomDirectionIndex];
  }

  update() {

    if (this.direction === null) {
      this.randomDirection();
      return;
    }

    if (this.checkWall()) {
      this.randomDirection();
      return;
    }

    if (!this.checkIfCanMove()) {
      //Random new direction
      this.randomDirection();
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


  checkIfCanMove() {
    let imageData = [];
    let pixelArray = [];
    //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
    //Cutting out an array of pixels in front of ghost for each move depending on direction.
    if (this.direction === 'right') {
      imageData = this.ctx.getImageData(this.x + this.ghostRadius, this.y - this.ghostRadius, 1, this.ghostRadius * 2);
    } else if (this.direction === 'up') {
      imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y - this.ghostRadius, this.ghostRadius * 2, -1);
    } else if (this.direction === 'left') {
      imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y - this.ghostRadius, -1, this.ghostRadius * 2);
    } else if (this.direction === 'down') {
      imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y + this.ghostRadius, this.ghostRadius * 2, 1);
    } else {
      console.log('Error direction ', this.direction, '  not defined.')
    }

    pixelArray = imageData.data;
    const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);

    if (nextMoveValue === 0) {
      return true;
    }
    //---- Color of the candy -------//
    if (this.checkColor(250, 252, 182, pixelArray)) {
      return true;
      //----- Color of Pac Man 'rgb(255, 255, 1)' -----//
    } else if (this.checkColor(255, 255, 1, pixelArray)) {
      this.ghostHitPacmanCallback(); // Calls ghostHitPacman() in games.js
      //console.log('Haha')
      return true;
      // ------ Border color "rgb(20, 20, 255)"; -----//
    } else if (this.checkColor(20, 20, 255, pixelArray)) {
      return false;
    }

    // if (nextMoveValue !== 0) {
    //   debugger;
    //   return true;
    // }
    return true;

  }

  hideGhost() {
    this.x = -100;
    this.y = -100;
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

  checkWall() {

    if (this.direction === 'right') {
      if (this.x + this.ghostRadius + this.speed >= parseInt(this.canvas.width)) {
        return true;
      }
    } else if (this.direction === 'up') {
      if (this.y - this.ghostRadius <= 0) {
        return true;
      }
    } else if (this.direction === 'left') {
      if (this.x - this.ghostRadius <= 0) {
        return true;
      }
    } else if (this.direction === 'down') {
      if (this.y + this.ghostRadius + this.speed >= parseInt(this.canvas.height)) {
        return true;
      }
    }
  }
}