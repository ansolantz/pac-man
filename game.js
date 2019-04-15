'use strict'


class Game {
  pacman = null;
  ghosts = [];
  levelNumber = 1;
  gameOver = false;
  candy = null;
  candies = []

  constructor(canvas) {
    console.log('Creating Game');

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas = canvas;
    this.pacman = new PacMan(50, 50, this.canvas, this.candyEaten);
    this.level = new Level(this.canvas, this.levelNumber);

    //this.candy = new Candy(200, 40, this.canvas);
    //this.candies.push(new Candy(200, 40, this.canvas));

    this.candyX = 300;
    this.candyY = 50

    for (let i = 1; i < 5; i++) {
      this.candies.push(new Candy(this.candyX, this.candyY, this.canvas))
      this.candyX = this.candyX + 40;
      this.candyY = this.candyY;
    }


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

    // this.pacman = new PacMan(50, 50, this.canvas);

    console.log('Im in the looooooop');

    const loop = () => {

      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      this.checkCollisions();

      // console.log(this.pacman.direction)
      // this.pacman.getPixelColorAtCoordinate();

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
    // this.ghost.update();
  }



  candyEaten(candyX, candyY) {

    // this.candies.forEach(candy => {
    //   console.log(candy);
    // });
    console.log('Yummy! Candy found at x ', candyX, ' and y ', candyY);
  }


  drawCanvas() {

    this.level.draw();

    //this.candies.draw();

    this.candies.forEach(candy => {
      candy.draw();
    });

    this.pacman.draw();
  }

  checkCollisions() {
  }

  setGameOver(buildGameOverScreen) {
    this.buildGameOverScreen = buildGameOverScreen;
  }


}
