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

  function buildSplashScreen() {     // Building splash screen
    const splashScreen = buildDom(`
      <section>
      <h2>Click start to play</h2>
      <button class="start-button">Start</button>
      </section>
      `);

    const startButton = document.querySelector('.start-button');

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
    //lives.innerHTML = "life: ";

    const game = new Game(canvasElement, buildGameOverScreen, livesDiv);
    //Playing sound

    game.startLoop();


    //setTimeout(buildGameOverScreen, 3000); //To test GameOverSreen
  }


  function buildGameOverScreen(pacmanWon) {
    // console.log('game over');
    const gameOverScreen = buildDom(`
    <section>
    <h2>Game Over</h2>
    <div id="pacman-won"></div>
    <button class="restart-button">Restart</buton>
    </section>
    `);
    const pacmanWonDiv = document.querySelector('#pacman-won');
    const restartButton = document.querySelector('.restart-button');
    if (pacmanWon) {
      pacmanWonDiv.innerHTML = 'Yey Pac Man won!!'
    } else {
      pacmanWonDiv.innerHTML = 'Sorry!! Pac Man looses'
    }

    restartButton.addEventListener('click', buildGameScreen);
  }

  //buildSplashScreen();  //Hiding splash while developing..
  buildGameScreen();
}

window.addEventListener('load', main);
