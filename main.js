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
      <h2>Click startt o play</h2>
      <button class="start-button">Start</button>
      </section>
      `);

    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('click', buildGameScreen)
  }


  function buildGameScreen() {  //Building gameScreen
    // console.log('you are on the game screen')

    const gameScreen = buildDom(`
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

    const game = new Game(canvasElement);
    game.startLoop();

    game.setGameOver(buildGameOverScreen);

    //setTimeout(buildGameOverScreen, 3000); //To test GameOverSreen
  }


  function buildGameOverScreen() {
    // console.log('game over');
    const gameOverScreen = buildDom(`
    <section>
    <h1>Game Over</h1>
    <button class="restart-button">Restart</buton>
    </section>
    `);

    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', buildGameScreen);
  }

  //buildSplashScreen();  //Hiding splash while developing..
  buildGameScreen();
}

window.addEventListener('load', main);
