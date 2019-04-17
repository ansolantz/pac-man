'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log('ghost');

var Ghost =
/*#__PURE__*/
function () {
  function Ghost(x, y, canvas, color, ghostHitPacmanCallback) {
    _classCallCheck(this, Ghost);

    this.x = x;
    this.y = y;
    this.direction = '';
    this.moveX = 0;
    this.moveY = 0;
    this.ghostRadius = 16; // original size

    this.speed = 1; //speed 1, 2, 4, 8, 32

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.color = color;
    this.ghostHitPacmanCallback = ghostHitPacmanCallback;
    this.randomDirection();
  }

  _createClass(Ghost, [{
    key: "draw",
    value: function draw() {
      //console.log('Drawing ghost');
      // ctx.arc(x, y, radius, startAngle, endAngle)
      //  Math.PI * 2 - Full circle    Math.PI * 1 -  Half circle
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.ghostRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath(); // TRIANGLE
      // start the path
      // this.ctx.beginPath();
      // // change the fill style
      // this.ctx.fillStyle = "rgb(255, 0, 144)";
      // // starting position is x=150, y=200
      // this.ctx.moveTo(this.x, this.y - 20);
      // // draw the line that has final coordinates x=100, y=250
      // this.ctx.lineTo(this.x - 30, this.y + 30);
      // // draw the line that has final coordinates x=200, y=250 
      // this.ctx.lineTo(this.x + 30, this.y + 30);
      // // fills the shape and closes the path automatically
      // this.ctx.fill();
      // // close the path
      // this.ctx.closePath();
      // Drawing ghost eyes's -------------

      this.ctx.beginPath();
      this.ctx.arc(this.x - 6, this.y - 6, 3, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgb(255, 255, 255)";
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x + 6, this.y - 6, 3, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgb(255, 255, 255)";
      this.ctx.fill();
      this.ctx.closePath(); //----------------------------------
    }
  }, {
    key: "randomDirection",
    value: function randomDirection() {
      //--- Random ghost direction ---//
      var directions = ['right', 'up', 'left', 'down'];
      var randomDirectionIndex = Math.floor(Math.random() * directions.length);
      this.direction = directions[randomDirectionIndex];
    }
  }, {
    key: "update",
    value: function update() {
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
  }, {
    key: "checkIfCanMove",
    value: function checkIfCanMove() {
      var imageData = [];
      var pixelArray = []; //ctx.getImageData(startCuX, startCutY, numberOfPixelsToCutX, numberOfPixelsToCutY;
      //Cutting out an array of pixels in front of PacMan for each move depending on direction.

      if (this.direction === 'right') {
        imageData = this.ctx.getImageData(this.x + this.ghostRadius, this.y - this.ghostRadius, 1, this.ghostRadius * 2);
      } else if (this.direction === 'up') {
        imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y - this.ghostRadius, this.ghostRadius * 2, -1);
      } else if (this.direction === 'left') {
        imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y - this.ghostRadius, -1, this.ghostRadius * 2);
      } else if (this.direction === 'down') {
        imageData = this.ctx.getImageData(this.x - this.ghostRadius, this.y + this.ghostRadius, this.ghostRadius * 2, 1);
      } else {
        console.log('Error direction ', this.direction, '  not defined.');
      }

      pixelArray = imageData.data;
      var nextMoveValue = pixelArray.reduce(function (accumulator, element) {
        return accumulator + element;
      });

      if (nextMoveValue === 0) {
        return true;
      }

      if (this.checkColor(250, 252, 182, pixelArray)) {
        //Color of the candy
        return true;
      } else if (this.checkColor(255, 255, 1, pixelArray)) {
        //Color of Pac Man 'rgb(255, 255, 1)'
        this.ghostHitPacmanCallback(); // Calls ghostHitPacman() in games.js
        //console.log('Haha

        return true;
      } else if (this.checkColor(20, 20, 255, pixelArray)) {
        // Border color "rgb(20, 20, 255)";
        return false;
      } // if (nextMoveValue !== 0) {
      //   debugger;
      //   return true;
      // }


      return true;
    }
  }, {
    key: "checkColor",
    value: function checkColor(rgbNumber1, rgbNumber2, rgbNumber3, pixelArray) {
      var found = false;

      for (var i = 0; i < pixelArray.length; i++) {
        if (pixelArray[i] === rgbNumber1 && pixelArray[i + 1] === rgbNumber2 && pixelArray[i + 2] === rgbNumber3) {
          found = true;
          break;
        }
      }

      return found;
    }
  }, {
    key: "checkWall",
    value: function checkWall() {
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
  }]);

  return Ghost;
}();