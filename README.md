# Pac Man

## Description

A Pac Man game where Pac Man should eat all the food (dots) placed on the game board, without being hit by a ghost.


## MVP(DOM - CANVAS)

CANVAS, Pac Man will be moving on a canvas. 
 - When a border is hit, he will stop. 
 - When a candy is found, it will be removed from the playfield (maybe a score will be given)
 - If a collision with a ghost happens, the game is over. (If there is time, maybe there can be 3 lives)

Limitations:
 - There will be no inner walls unless there is a lot of time left in the end since the collisions might be hard to detect.


## Backlog
  - Images.
  - Inner walls.
  - Graphics.
  - Sound effects.
  - Levels.
  - Responsive.


## Data structure
Classes and methods definition.

The first version be in ES6 because there are so many things to solve and I want to use the latest tools. However if there is time left in the end, I might make a version of one or more classes (for instance the PacMan class) using prototypes as well just to show the two alternatives. The behaviour should be exactly the same for the game.

### main.js
This file will setup the different screens depending on the user action.
buildSplashScreen()  - The first screen, will just have a start button
buildGameScreen() - The actual game where all the action takes place
buildGameOverScreen() - What is shown at game over, did PacMan win or loose.

### game.js
This class controls the playing field where PacMan moves. It will also check for collisions between each re-rendering of the playfield.
```
class Game {
  pacman;
  canvas;
  food[];
  constructor() {}

  startLoop() {}

  clearCanvas(){}

  updatateCanvas() {}

  drawCanvas() {}

}
```

### pacman.js
```
class PacMan {
  x = 0;
  y = 0;
  canvas;
  lives = 0
  direction = '';

  constructor(x, y, canvas) {
  }

  draw() {}

  update() {}

  checkWall() {}

  setDirection(newDirection) {}

  setLives() {}
}
```


### ghost.js
```
// A ghost does not have lives
class Ghost {
  x = 0;
  y = 0;
  direction = '';

  constructor(x, y, canvas) {}

  draw() {}

  update() {}

  checkWall() {}

  setDirection(newDirection) {}
}
```


### food.js
```
// A ghost does not have lives
class Candy {
  x = 0;
  y = 0;

  constructor(x, y, canvas) {}

  draw() {}
}
```


## States y States Transitions
Definition of the different states and their transition(transition functions)

  - splashScreen
    - hideGameOver()
    - buildSplash()
    - addEventListener(startGame)
    
  - gameScreen
    - hideSplash()
    - hideGameOver()
    - create new Game()
    - game.start()
  
  - gameoverScreen
    - hideGame()
    - buildGameOver()
    - addEventListener(startGame) 



## Task
Task definition in order of priority
 - Create Splash screen
 - Create Game Screen
 - Create Game Over Screen
 - Create the files for main.js, game.js and pacman.js
 - Create Loop
 - Make sure pacman can move in all 4 directions
 - Make sure PacMan is restricted by the borders of the playfield.
 - PacMan can eat a candy and it disapears
 - PacMan get a point when a candy is eaten
 - If PacMan eats all the candy, the game is finished (PacMan wins)
 - Add ghosts
 - If PacMan hits or is hit by a ghost, he dies and the game is over (PacMan looses)

 
## Links


### Trello
[Link url](https://trello.com)


  ### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
  [Link Deploy](http://github.com)


    ### Slides
URls for the project presentation(slides)
[Link Slides.com](http://slides.com)
