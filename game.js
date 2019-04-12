'use strict'


class Game {
  pacman = null;
  ghosts = [];
  gameOver = false;

  constructor(canvas) {
    console.log('Creating Game');

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas = canvas;
    this.pacman = new PacMan(50, 50, this.canvas);


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

      this.clearCanvas();
      this.updateCanvas();
      this.drawCanvas();
      this.checkCollisions();

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
  }

  drawCanvas() {
    this.pacman.draw();
  }

  checkCollisions() {
  }

  setGameOver(buildGameOverScreen) {
    this.buildGameOverScreen = buildGameOverScreen;
  }


}
