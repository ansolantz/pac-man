'use strict'

class Game {

  constructor(canvas, gameOverCallback, livesDiv) {
    //console.log('Creating Game');
    this.ghosts = [];
    this.levelNumber = 1;
    this.gameOver = false;
    this.candies = []
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas = canvas;
    this.gameOverCallback = gameOverCallback;
    this.livesDiv = livesDiv;

    this.pacmanDeath = new Audio('sounds/pacman_death.wav');
    this.pacmanChomp = new Audio('sounds/pacman_chomp.wav');

    this.candies.push(new Candy(66, 18, this.canvas))
    this.candies.push(new Candy(164, 18, this.canvas))
    this.candies.push(new Candy(312, 18, this.canvas))
    this.candies.push(new Candy(410, 18, this.canvas))

    this.candies.push(new Candy(18, 66, this.canvas))
    this.candies.push(new Candy(115, 66, this.canvas))
    this.candies.push(new Candy(213, 66, this.canvas))
    this.candies.push(new Candy(263, 66, this.canvas))
    this.candies.push(new Candy(361, 66, this.canvas))
    this.candies.push(new Candy(459, 66, this.canvas))

    this.candies.push(new Candy(66, 114, this.canvas))
    this.candies.push(new Candy(164, 114, this.canvas))
    this.candies.push(new Candy(238, 114, this.canvas))
    this.candies.push(new Candy(312, 114, this.canvas))
    this.candies.push(new Candy(410, 114, this.canvas))

    this.candies.push(new Candy(66, 181, this.canvas))
    this.candies.push(new Candy(164, 165, this.canvas))
    this.candies.push(new Candy(312, 181, this.canvas))
    this.candies.push(new Candy(410, 181, this.canvas))

    //------ Creating 4 ghosts in array ------------//
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(255, 138, 170', () => this.ghostHitPacman()));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(36, 180, 237', () => this.ghostHitPacman()));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(244, 10, 29', () => this.ghostHitPacman()));
    this.ghosts.push(new Ghost(230, 200, this.canvas, 'rgb(244, 132, 3', () => this.ghostHitPacman()));

    // let myCandyEatenArrowFunction = () => this.candyEaten()

    // --- Sending Arrow Function  to not loose context of this ----- //
    //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback

    // starting at 25, 25 is working 
    this.pacman = new PacMan(25, 215, this.canvas, (candyX, candyY) => {
      this.candyEaten(candyX, candyY)
    }, () => this.pacManHitGhost());

    this.level = new Level(this.canvas, this.levelNumber);

    document.onkeydown = (event) => {
      switch (event.keyCode) {
        case 37:
          this.pacman.setWantedDirection('left');
          break;
        case 38:
          this.pacman.setWantedDirection('up');
          break;
        case 39:
          this.pacman.setWantedDirection('right');
          break;
        case 40:
          this.pacman.setWantedDirection('down');
          break;
      }
    };
  }


  startLoop() {

    const loop = () => {

      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();

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

    this.ghosts.forEach(ghost => {
      ghost.update();
    });
  }


  //Loosing context of 'this'(this = PacMan) here, solving by sending an arrow function.
  candyEaten(candyXApprox, candyYApprox) {
    this.pacmanChomp.play();
    // ---- Collision detection with candy --- //
    const candyIndex = this.candies.findIndex(candy => {
      if (candy.x >= candyXApprox - 10 && candy.x <= candyXApprox + 10 && candy.y >= candyYApprox - 10 && candy.y <= candyYApprox + 10) {
        console.log('Candy x ', candy.x);
        console.log('Candy y ', candy.y);
        console.log('Yummy! Candy found at x ', candyXApprox, ' and y ', candyYApprox);
        return true;
      } else {
        return false;
      }
    });
    this.candies.splice(candyIndex, 1)
    if (this.candies.length === 0) {
      this.gameOver = true;

      this.gameOverCallback(true);
    }
  }

  ghostHitPacman() {
    console.log('Hahah got ya!')
    this.pacman.lifeLost();
    this.pacmanDeath.play();
    //this.pacman.startImmortal();
    if (this.pacman.lives === 0) {
      this.gameOver = true;
      this.gameOverCallback(false);
    } else {
      this.startLostLifeTimer();
    }
    this.livesDiv.innerHTML = `${this.pacman.lives} UP`
  }

  pacManHitGhost() {
    console.log('Oh no!!')
    this.pacman.lifeLost();
    this.pacmanDeath.play();
    if (this.pacman.lives === 0) {
      this.gameOver = true;
      this.gameOverCallback(false);
    } else {
      this.startLostLifeTimer();
    }
    this.livesDiv.innerHTML = `${this.pacman.lives} UP`
  }

  setGhostStartPositions() {
    console.log('ghosts starts overs')
    this.ghosts.forEach(ghost => {
      ghost.x = 236;
      ghost.y = 200;
    });

  }

  drawCanvas() {
    this.level.draw();
    this.candies.forEach(candy => {
      candy.draw();
    });
    this.pacman.draw();
    this.ghosts.forEach(ghost => {
      ghost.draw();
    });
    this.livesDiv.innerHTML = `${this.pacman.lives} UP`
  }

  startLostLifeTimer() {
    console.log('Pac Man lost a life');

    this.ghosts.forEach(ghost => {
      ghost.hideGhost();
    });
    this.pacman.hidePackMan();

    setTimeout(() => {
      console.log('Waiting...');
      this.pacman.setStartPosition();
      this.setGhostStartPositions();
    }, 3000);
  }


  setGameOver(buildGameOverScreen) {
    this.buildGameOverScreen = buildGameOverScreen;
  }
}
