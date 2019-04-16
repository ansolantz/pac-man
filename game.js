'use strict'

class Game {
  pacman = null;
  ghosts = [];
  levelNumber = 1;
  gameOver = false;
  candy = null;
  candies = []
  gameOverCallback;

  constructor(canvas, gameOverCallback) {
    console.log('Creating Game');

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas = canvas;
    this.gameOverCallback = gameOverCallback;


    //this.candy = new Candy(200, 40, this.canvas);
    //this.candies.push(new Candy(200, 40, this.canvas));

    this.candyX = 300;
    this.candyY = 50

    for (let i = 1; i < 5; i++) {
      this.candies.push(new Candy(this.candyX, this.candyY, this.canvas))
      this.candyX = this.candyX + 50;
      this.candyY = this.candyY;
    }

    //Create 4 ghosts i array
    this.ghost = new Ghost(300, 200, this.canvas, 'rgb(255, 138, 170', () => this.ghostHitPacman());
    //this.ghosts.push(new Ghost(200, 160, this.canvas, 'rgb(255, 138, 170');

    // let myCandyEatenArrowFunction = () => this.candyEaten()
    // this.pacman = new PacMan(50, 50, this.canvas, myCandyEatenArrowFunction);

    // --- Sending Arrow Function  to not loose context of this ----- //
    //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback

    this.pacman = new PacMan(50, 50, this.canvas, (candyX, candyY) => {
      this.candyEaten(candyX, candyY)
    });

    // let myCandyEatenFunction = this.candyEaten
    // this.pacman = new PacMan(50, 50, this.canvas, myCandyEatenFunction);

    this.level = new Level(this.canvas, this.levelNumber);


    document.onkeydown = (event) => {
      switch (event.keyCode) {
        case 37:
          this.pacman.setDirection('left');
          break;
        case 38:
          this.pacman.setDirection('up');
          break;
        case 39:
          this.pacman.setDirection('right');
          break;
        case 40:
          this.pacman.setDirection('down');
          break;
      }
    };
  }


  startLoop() {

    // this.pacman = new PacMan(50, 50, this.canvas, this.candyEaten);

    //console.log('Im in the looooooop');

    const loop = () => {

      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

      // console.log(this.pacman.direction)

      if (this.gameOver === false) {
        window.requestAnimationFrame(loop);
      }
    }

    window.requestAnimationFrame(loop);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  updateCanvas() {
    this.pacman.update();
    this.ghost.update();
  }


  //Loosing context of 'this'(this = PacMan) here, solving by sending an arrow function.
  candyEaten(candyXApprox, candyYApprox) {

    // ---- Collision detection with candy --- //
    const candyIndex = this.candies.findIndex(candy => {
      if (candy.x >= candyXApprox - 10 && candy.x <= candyXApprox + 10 && candy.y >= candyYApprox - 10 && candy.y <= candyYApprox + 10) {
        console.log('Yummy! Candy found at x ', candyXApprox, ' and y ', candyYApprox);
        return true;
      } else {
        return false;
      }
    });
    this.candies.splice(candyIndex, 1)
    if (this.candies.length === 0) {
      this.gameOver = true;
      this.gameOverCallback();
    }
  }

  ghostHitPacman() {
    console.log('Hahah got ya!')

    this.pacman.setLives();
    this.pacman.startImmortal();
    if (this.pacman.lives === 0) {
      this.gameOver = true;
    }
  }


  drawCanvas() {
    this.level.draw();
    this.candies.forEach(candy => {
      candy.draw();
    });
    this.ghost.draw();
    this.pacman.draw();
  }


  setGameOver(buildGameOverScreen) {
    this.buildGameOverScreen = buildGameOverScreen;
  }


}
