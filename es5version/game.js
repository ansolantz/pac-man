'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(canvas, gameOverCallback, livesDiv) {
    var _this = this;

    _classCallCheck(this, Game);

    console.log('Creating Game');
    this.ghosts = [];
    this.levelNumber = 1;
    this.gameOver = false;
    this.candies = [];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas = canvas;
    this.gameOverCallback = gameOverCallback;
    this.livesDiv = livesDiv;
    this.pacmanDeath = new Audio('sounds/pacman_death.wav');
    this.pacmanChomp = new Audio('sounds/pacman_chomp.wav');
    this.candies.push(new Candy(66, 18, this.canvas));
    this.candies.push(new Candy(164, 18, this.canvas));
    this.candies.push(new Candy(312, 18, this.canvas));
    this.candies.push(new Candy(410, 18, this.canvas));
    this.candies.push(new Candy(18, 66, this.canvas));
    this.candies.push(new Candy(115, 66, this.canvas));
    this.candies.push(new Candy(213, 66, this.canvas));
    this.candies.push(new Candy(263, 66, this.canvas));
    this.candies.push(new Candy(361, 66, this.canvas));
    this.candies.push(new Candy(459, 66, this.canvas));
    this.candies.push(new Candy(66, 114, this.canvas));
    this.candies.push(new Candy(164, 114, this.canvas));
    this.candies.push(new Candy(238, 114, this.canvas));
    this.candies.push(new Candy(312, 114, this.canvas));
    this.candies.push(new Candy(410, 114, this.canvas));
    this.candies.push(new Candy(66, 181, this.canvas));
    this.candies.push(new Candy(164, 165, this.canvas));
    this.candies.push(new Candy(312, 181, this.canvas));
    this.candies.push(new Candy(410, 181, this.canvas)); //Create 4 ghosts in array

    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(255, 138, 170', function () {
      return _this.ghostHitPacman();
    }));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(36, 180, 237', function () {
      return _this.ghostHitPacman();
    }));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(244, 10, 29', function () {
      return _this.ghostHitPacman();
    }));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(244, 132, 3', function () {
      return _this.ghostHitPacman();
    })); // let myCandyEatenArrowFunction = () => this.candyEaten()
    // this.pacman = new PacMan(50, 50, this.canvas, myCandyEatenArrowFunction);
    // --- Sending Arrow Function  to not loose context of this ----- //
    //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
    // starting at 25, 25 working  25, 215,

    this.pacman = new PacMan(25, 215, this.canvas, function (candyX, candyY) {
      _this.candyEaten(candyX, candyY);
    }, function () {
      return _this.pacManHitGhost();
    });
    this.level = new Level(this.canvas, this.levelNumber);

    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          _this.pacman.setWantedDirection('left');

          break;

        case 38:
          _this.pacman.setWantedDirection('up');

          break;

        case 39:
          _this.pacman.setWantedDirection('right');

          break;

        case 40:
          _this.pacman.setWantedDirection('down');

          break;
      }
    };
  }

  _createClass(Game, [{
    key: "startLoop",
    value: function startLoop() {
      var _this2 = this;

      var loop = function loop() {
        _this2.updateCanvas();

        _this2.clearCanvas();

        _this2.drawCanvas();

        if (_this2.gameOver === false) {
          window.requestAnimationFrame(loop);
        }
      };

      window.requestAnimationFrame(loop);
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas() {
      this.pacman.update();
      this.ghosts.forEach(function (ghost) {
        ghost.update();
      });
    } //Loosing context of 'this'(this = PacMan) here, solving by sending an arrow function.

  }, {
    key: "candyEaten",
    value: function candyEaten(candyXApprox, candyYApprox) {
      //this.soundEffect.play();
      this.pacmanChomp.play(); // ---- Collision detection with candy --- //

      var candyIndex = this.candies.findIndex(function (candy) {
        if (candy.x >= candyXApprox - 10 && candy.x <= candyXApprox + 10 && candy.y >= candyYApprox - 10 && candy.y <= candyYApprox + 10) {
          console.log('Candy x ', candy.x);
          console.log('Candy y ', candy.y);
          console.log('Yummy! Candy found at x ', candyXApprox, ' and y ', candyYApprox);
          return true;
        } else {
          return false;
        }
      });
      this.candies.splice(candyIndex, 1);

      if (this.candies.length === 0) {
        this.gameOver = true;
        this.gameOverCallback(true);
      }
    }
  }, {
    key: "ghostHitPacman",
    value: function ghostHitPacman() {
      console.log('Hahah got ya!');
      this.pacman.lifeLost();
      this.pacmanDeath.play(); //this.pacman.startImmortal();

      if (this.pacman.lives === 0) {
        this.gameOver = true;
        this.gameOverCallback(false);
      } else {
        this.startLostLifeTimer();
      }

      this.livesDiv.innerHTML = "".concat(this.pacman.lives, " UP");
    }
  }, {
    key: "pacManHitGhost",
    value: function pacManHitGhost() {
      console.log('Oh no!!');
      this.pacman.lifeLost();
      this.pacmanDeath.play();

      if (this.pacman.lives === 0) {
        this.gameOver = true;
        this.gameOverCallback(false);
      } else {
        this.startLostLifeTimer();
      }

      this.livesDiv.innerHTML = "".concat(this.pacman.lives, " UP");
    }
  }, {
    key: "setGhostStartPositions",
    value: function setGhostStartPositions() {
      console.log('ghosts starts overs');
      this.ghosts.forEach(function (ghost) {
        ghost.x = 236;
        ghost.y = 200;
      });
    }
  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      this.level.draw();
      this.candies.forEach(function (candy) {
        candy.draw();
      });
      this.pacman.draw();
      this.ghosts.forEach(function (ghost) {
        ghost.draw();
      });
      this.livesDiv.innerHTML = "".concat(this.pacman.lives, " UP");
    }
  }, {
    key: "startLostLifeTimer",
    value: function startLostLifeTimer() {
      var _this3 = this;

      console.log('Pac Man lost a life');
      this.ghosts.forEach(function (ghost) {
        ghost.hideGhost();
      });
      this.pacman.hidePackMan();
      setTimeout(function () {
        console.log('Waiting...');

        _this3.pacman.setStartPosition();

        _this3.setGhostStartPositions();
      }, 3000);
    }
  }, {
    key: "setGameOver",
    value: function setGameOver(buildGameOverScreen) {
      this.buildGameOverScreen = buildGameOverScreen;
    }
  }]);

  return Game;
}();