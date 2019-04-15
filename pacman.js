'use strict'
console.log('pac man')

class PacMan {

  x = 0;
  y = 0;
  canvas;
  candyEatenCallback = null;
  lives = 0
  direction = null;
  speed = 2;  //speed 1, 2, 4, 8, 32
  ctx = null;
  moveX = 0;
  moveY = 0;
  pacManRadius = 16;
  isMouthClosing = true;

  animationCounter = 0;
  animationMaxValue = 0.24;  //Controles the animation of PacMans mouth

  imgId = '';
  imgHeight = '';
  img = document.createElement('img');

  constructor(x, y, canvas, candyEatenCallback) {
    console.log('Creating Pack Man');
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.candyEatenCallback = candyEatenCallback;
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

    // console.log("Image height: ", this.imgHeight);
    // console.log("Image width: ", this.imgWidth);


  }

  update() {

    if (this.direction === null) {
      return;
    }

    if (this.checkWall()) {
      // console.log('has hit wall');
      return;
    }

    if (!this.checkIfCanMove()) {
      // console.log('has hit a line');
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
      this.ctx.fillStyle = "rgb(255, 255, 0)";
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
      this.ctx.fillStyle = "rgb(255, 255, 0)";
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

  checkIfCanMove() {
    let imageData = [];
    let pixelArray = [];
    //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
    //Cutting out an array of pixels in front of PacMan for each move depending on direction.
    if (this.direction === 'right') {
      imageData = this.ctx.getImageData(this.x + this.pacManRadius, this.y - this.pacManRadius, 1, this.pacManRadius * 2);
    } else if (this.direction === 'up') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, this.pacManRadius * 2, -1);
    } else if (this.direction === 'left') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, -1, this.pacManRadius * 2);
    } else if (this.direction === 'down') {
      imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y + this.pacManRadius, this.pacManRadius * 2, 1);
    } else {
      console.log('Error direction ', this.direction, '  not defined.')
    }

    pixelArray = imageData.data;
    const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);

    if (pixelArray.includes(250) && pixelArray.includes(252) && pixelArray.includes(182)) {
      //console.log('Yummy!');

      this.candyEatenCallback(this.x, this.y); // Calls candyFound() in games.js
      return true;
    } else {
      return (nextMoveValue === 0);
    }


  }

  getPixelColorAtCoordinate() {

  }

  checkWall() {

    if (this.direction === 'right') {
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

// ---- original CheckIfcanMove

// checkIfCanMove() {

//   if (this.direction === 'right') {

//     const imageData = this.ctx.getImageData(this.x + this.pacManRadius, this.y - this.pacManRadius, 1, this.pacManRadius * 2);
//     const pixelArray = imageData.data;


//     // const nextMoveValue = pixelArray.reduce((accumulator, element) => {
//     //   return accumulator + element
//     // });

//     const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);
//     return (nextMoveValue === 0);


//     // Cutting out PacMan + speed right
//     // const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, (this.pacManRadius * 2) + this.speed, this.pacManRadius * 2);
//     // const pixelArray = imageData.data;
//     // const topRightIndex = ((this.pacManRadius * 2) + this.speed - 1) * 4;
//     // const bottomRighIndex = pixelArray.length - 4;

//     // if ((pixelArray[topRightIndex] === 0 && pixelArray[topRightIndex + 1] === 0 && pixelArray[topRightIndex + 2] === 0)
//     //   && (pixelArray[bottomRighIndex] === 0 && pixelArray[bottomRighIndex + 1] === 0 && pixelArray[bottomRighIndex + 2] === 0)) {
//     //   return true;
//     // }

//   } else if (this.direction === 'up') {


//     //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;

//     const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, this.pacManRadius * 2, -1);
//     const pixelArray = imageData.data;

//     const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);
//     return (nextMoveValue === 0);

//     // // Cutting out PacMan + speed upp
//     // const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius - this.speed, (this.pacManRadius * 2), this.pacManRadius * 2);
//     // const pixelArray = imageData.data;
//     // const topLeftIndex = 0;
//     // const topRightIndex = ((this.pacManRadius * 2) + this.speed - 1) * 4;

//     // if ((pixelArray[topLeftIndex] === 0 && pixelArray[topLeftIndex + 1] === 0 && pixelArray[topLeftIndex + 2] === 0)
//     //   && (pixelArray[topRightIndex] === 0 && pixelArray[topRightIndex + 1] === 0 && pixelArray[topRightIndex + 2] === 0)) {
//     //   return true;
//     // }


//   } else if (this.direction === 'left') {

//     //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
//     const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, -1, this.pacManRadius * 2);
//     const pixelArray = imageData.data;

//     const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);
//     return (nextMoveValue === 0);


//     // // Cutting out PacMan + speed left
//     // const imageData = this.ctx.getImageData(this.x - this.pacManRadius - this.speed, this.y - this.pacManRadius, this.pacManRadius * 2, this.pacManRadius * 2);
//     // const pixelArray = imageData.data;
//     // const topLeftIndex = 0;
//     // const bottomLeftIndex = pixelArray.length - (this.pacManRadius * 2 + this.speed - 1) * 4;

//     // if ((pixelArray[topLeftIndex] === 0 && pixelArray[topLeftIndex + 1] === 0 && pixelArray[topLeftIndex + 2] === 0)
//     //   && (pixelArray[bottomLeftIndex] === 0 && pixelArray[bottomLeftIndex + 1] === 0 && pixelArray[bottomLeftIndex + 2] === 0)) {
//     //   return true;
//     // }

//   } else if (this.direction === 'down') {


//     //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
//     const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y + this.pacManRadius, this.pacManRadius * 2, 1);
//     const pixelArray = imageData.data;

//     const nextMoveValue = pixelArray.reduce((accumulator, element) => accumulator + element);
//     return (nextMoveValue === 0);


//     // // Cutting out PacMan + speed down
//     // const imageData = this.ctx.getImageData(this.x - this.pacManRadius, this.y - this.pacManRadius, this.pacManRadius * 2, this.pacManRadius * 2 + this.speed);
//     // const pixelArray = imageData.data;
//     // const bottomLeftIndex = pixelArray.length - (this.pacManRadius * 2 - 1) * 4;
//     // const bottomRighIndex = pixelArray.length - 4;

//     // if ((pixelArray[bottomLeftIndex] === 0 && pixelArray[bottomLeftIndex + 1] === 0 && pixelArray[bottomLeftIndex + 2] === 0)
//     //   && (pixelArray[bottomRighIndex] === 0 && pixelArray[bottomRighIndex + 1] === 0 && pixelArray[bottomRighIndex + 2] === 0)) {
//     //   return true;
//     // }


//   } else {
//     console.log('Error direction ', this.direction, '  not defined.')
//   }

//   //console.log("pixel array: ", pixelArray);
//   //console.log(pixelArray[topRightIndex]);
//   //this.ctx.putImageData(imageData, 200, 200);

// }


// // let x1ToCheck;
//     // let y1ToCheck;
//     // let x2ToCheck;
//     // let y2ToCheck;
//     // x1ToCheck = this.x + pacManRadius + speed;
//     // y1ToCheck = this.y - pacManRadius + speed;
//     // x2ToCheck = this.x + pacManRadius + speed;
//     // y2ToCheck = this.y + pacManRadius + speed;






    //this.ctx.arc(this.x, this.y, this.pacManRadius, 0.25 * Math.PI, 1.75 * Math.PI);
    // this.ctx.arc(this.x, this.y, this.pacManRadius, 0.05 * Math.PI, 1.95 * Math.PI);

    //   if (this.animationCounter < this.animationMaxValue / 2) {
    //     //Pac man close mouth
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x, this.y, this.pacManRadius, 2 * Math.PI, false);
    //     this.ctx.fillStyle = "rgb(255, 255, 0)";
    //     this.ctx.fill();
    //     this.ctx.beginPath();

    //   } else {
    //     //Pac Man open mouth
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x, this.y, this.pacManRadius, 0.25 * Math.PI, 1.25 * Math.PI, false);
    //     this.ctx.fillStyle = "rgb(255, 255, 0)";
    //     this.ctx.fill();
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x, this.y, this.pacManRadius, 0.75 * Math.PI, 1.75 * Math.PI, false);
    //     this.ctx.fill();
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x - 3, this.y - 8, 3, 0, 2 * Math.PI, false);
    //     this.ctx.fillStyle = "rgb(0, 0, 0)";
    //     this.ctx.fill();
    //   }
    //   this.animationCounter++;
    //   // if (this.animationCounter === 16) {
    //   //   this.animationCounter = 0;
    //   // }
    //   this.animationCounter = this.animationCounter % this.animationMaxValue;
    //   // this.ctx.fillStyle = 'blue';
    //   // this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);