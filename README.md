# Pac Man

## Description
This was my firs project at Ironhac, Barcelona. The task was to develop a game with Javascript and DOM. I chosed to do a Pac Man game since I did some smiler games in the past and I wanted something mor challenging. 

The game is developed on HTML canvas. This was my firs time using canvas an I it was a real challenge. The hardest part was to check the collisions. As Pac Man is trapped, he always have to check every move he makes. To detect the different collisions (walls, ghost, candy) I used the getImageData() Method. I cuted out a 1px wide array from the canvas in front of Pac Man. So it was like he had a plow in front of him for every move. There I checked the color code in the array for every move. With the candy, I also needed to add a 'standard' collision detection, since I needed the x and y positions to be able to delete them from the array.

All characters on the game is drawn on the canvas (did not use any images). To get the chewing effect on Pac Man I did a complete animation where I draw his mouth opening 1° in every frame of the loop and then closing again.

The level field i also drawn on the canvas, this is one thing that needs to bee improved (with a loop) since doing it this way was very time consuming.


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
