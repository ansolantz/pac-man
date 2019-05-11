# Pac Man

## Description
This was the first individual project at Ironhack, Barcelona. The task was to develop a game using pure Javascript, CSS, HTML and the deadline was 5 working days. 

I choose to build a Pacman game using a raw html canvas, no grids or images, everything is painted and animated in each frame, something that was much more challenging than anticipated but the end result is a much smoother game than most other html implementations out there.

You can play the game here [Link Deploy](http://ansolantz.github.io/pac-man)

The main challenges were:
1. Animating pacmans mouth opening and closing but with some help from the arc drawing tool it was quite quick to solve.
2. Detecting collisions. My solution for this was to cut out a 1px wide rectangle in front of pacman and the ghosts. This serves as a snowplough checking the next frame and thanks to this collision detection can be done by just checking the pixel color for 32 pixels (the height) for each sprite. Candy collision detection uses a more traditional method since when pacman eat the candy, we only have the approximate position.
3. Building the maze. Everything is pixel perfect meaning that the width of the path pacman and the ghosts move around in is exactly the size of the sprites. This is nice since they can not turn and face a wall (like the real game). This however required that all paths in the maze had exactly the right size something that took quite some time to get right and that is the reason the maze is not bigger than it is due to the time constraints.


# Prework and planning
## About the game
A Pac Man game where Pac Man should eat all the candy (dots) placed on the game board, without being hit by a ghost.

## MVP(DOM - CANVAS)

CANVAS, Pac Man will be moving on a canvas. 
 - When a border is hit, he will stop. 
 - When a candy is found, it will be removed from the playfield (maybe a score will be given)
 - If a collision with a ghost happens, the game is over. (If there is time, maybe there can be 3 lives)

Limitations:
 - There will be no inner walls unless there is a lot of time left in the end since the collisions might be hard to detect.


## Backlog
  - Images
  - ES5
  - Inner walls
  - Graphics
  - Sound effects
  - Levels
  - Responsive


## Data structure
Classes and methods definition.

The first version is made in ES6 because there are so many things to solve and I want to use the latest tools. However if there is time left in the end, I might make a version of one or more classes (for instance the PacMan class) using prototypes as well just to show the two alternatives. The behaviour should be exactly the same for the game.

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
  image = null;

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
  directionX = 0;
  directionY = 0;
  image = null;
  
  constructor(x, y, canvas) {}

  draw() {}

  update() {}

  checkWall() {}
}
```


### candy.js
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
 - Create the files index.html, style.css, main.js, game.js, pacman.js and ghost.js
 - Create Loop
 - Make sure PacMan can move in all 4 directions
 - Make sure PacMan is restricted by the borders of the playfield.
 - PacMan can eat a candy and it disappears.
 - PacMan get a point when a candy is eaten.
 - If PacMan eats all the candy, the game is finished (PacMan wins)
 - Add ghosts
 - If PacMan hits or is hit by a ghost, he dies and the game is over (PacMan looses)

 
## Links



### Git
URls for the project repo and deploy
[Link Deploy](http://ansolantz.github.io/pac-man)
[Link Repo](https://github.com/ansolantz/pac-man)

### Trello
[Link url](https://trello.com/b/z2mpVWIB/pacman)
 

### Slides
URls for the project presentation(slides)
[Link Slides.com](https://docs.google.com/presentation/d/1RWjV4MggI2Rnnka1X8exWezDW-TD17njPqTiqvsYAKI/edit?usp=sharing)
