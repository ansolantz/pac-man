'use strict';

console.log('main'); // document.addEventListener("DOMContentLoaded", function (event) {
//   main();
// });

function main() {
  var mainElement = document.querySelector('main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function buildSplashScreen() {
    // Building splash screen
    var splashScreen = buildDom("\n      <section>\n      <h2>Click start to play</h2>\n      <button class=\"start-button\">Start</button>\n      </section>\n      ");
    var startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', buildGameScreen);
  }

  function buildGameScreen() {
    //Building gameScreen
    // console.log('you are on the game screen')
    var gameScreen = buildDom("\n      <div id=\"lives\"></div>\n      <section class=\"game-container\">\n      <canvas></canvas>\n      </section>\n      ");
    var gameContainerElement = document.querySelector('.game-container');
    var width = gameContainerElement.offsetWidth;
    var height = gameContainerElement.offsetHeight;
    var canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);
    var livesDiv = document.querySelector('#lives'); //lives.innerHTML = "life: ";

    var game = new Game(canvasElement, buildGameOverScreen, livesDiv);
    game.startLoop(); //setTimeout(buildGameOverScreen, 3000); //To test GameOverSreen
  }

  function buildGameOverScreen(pacmanWon) {
    // console.log('game over');
    var gameOverScreen = buildDom("\n    <section>\n    <h2>Game Over</h2>\n    <div id=\"pacman-won\"></div>\n    <button class=\"restart-button\">Restart</buton>\n    </section>\n    ");
    var pacmanWonDiv = document.querySelector('#pacman-won');
    var restartButton = document.querySelector('.restart-button');

    if (pacmanWon) {
      pacmanWonDiv.innerHTML = 'Yey Pac Man won!!';
    } else {
      pacmanWonDiv.innerHTML = 'Sorry!! Pac Man looses';
    }

    restartButton.addEventListener('click', buildGameScreen);
  } //buildSplashScreen();  //Hiding splash while developing..


  buildGameScreen();
}

window.addEventListener('load', main);