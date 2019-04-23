'use strict'
console.log('main');
// document.addEventListener("DOMContentLoaded", function (event) {
//   main();
// });


function main() {

  const mainElement = document.querySelector('main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function buildIntro() {     // Building intro screen
    const introScreen = buildDom(`
      <section>
      <img src="img/pacman-intro.jpg" id="startimage">
      </section>
      `);

    const startImage = document.querySelector('#startimage');

    startImage.addEventListener('click', buildSplashScreen)
  }

  function buildSplashScreen() {     // Building splash screen
    const splashScreen = buildDom(`
      <section class="gameBorder">
      <h2>Ready!</h2>
      <button class="start-button">Start</button>
      </section>
      `);

    const startButton = document.querySelector('.start-button');

    // Playing sound ---------//
    const soundBeginning = new Audio('sounds/pacman_beginning.wav');
    soundBeginning.play();

    startButton.addEventListener('click', buildGameScreen)
  }


  function buildGameScreen() {  //Building gameScreen
    // console.log('you are on the game screen')

    const gameScreen = buildDom(`
      <div id="lives"></div>
      <section class="game-container">
      <canvas></canvas>
      </section>
      `);

    const gameContainerElement = document.querySelector('.game-container');
    const width = gameContainerElement.offsetWidth;
    const height = gameContainerElement.offsetHeight;

    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    const livesDiv = document.querySelector('#lives');

    const game = new Game(canvasElement, buildGameOverScreen, livesDiv);

    game.startLoop();

    //setTimeout(buildGameOverScreen, 3000); //To test GameOverSreen
  }


  function buildGameOverScreen(pacmanWon) {
    // console.log('game over');
    const gameOverScreen = buildDom(`
    <section class="gameBorder">
    <h2>Game Over</h2>
    <div id="pacman-won"></div>
    <button class="restart-button button">Play again?</buton>
    `);
    const pacmanWonDiv = document.querySelector('#pacman-won');
    const restartButton = document.querySelector('.restart-button');
    if (pacmanWon) {
      pacmanWonDiv.innerHTML = 'Yey! Pac Man won!'
    } else {
      pacmanWonDiv.innerHTML = 'Sorry!'
    }
    const soundBeginning = new Audio('sounds/pacman_beginning.wav');
    soundBeginning.play();
    restartButton.addEventListener('click', buildGameScreen);
  }

  //buildSplashScreen();  //To hide splash while developing...
  //buildGameScreen();

  //--- building intro screen to activate sound ------/
  buildIntro();
}

window.addEventListener('load', main);

