function Game(rows, columns, speed) {
  var nextDirection,
    initialSpeed = speed,
    minSpeed = 25,
    paused = false,
    gameSpace,
    currentSpeed;

  rows = rows > 5 ? rows : 5;
  columns = columns > 5 ? columns : 5;
  gameSpace = new GameSpace(rows, columns);
  init();
  start();


  function init() {
    paused = true;
    currentSpeed = Number(initialSpeed);
    gameSpace.initMap();
    addSnakeAndPray(gameSpace);
    nextDirection = gameSpace.snake.getCurrentDirection();
  }

  function addSnakeAndPray(gameSpace) {
    var row = parseInt(rows/3),
      column = parseInt(columns/3);

    gameSpace.gameMap[row][column].addSnake();
    gameSpace.snake.quadrants.push(gameSpace.gameMap[row][column]);
    gameSpace.gameMap[++row][column].addSnake();
    gameSpace.snake.quadrants.push(gameSpace.gameMap[row][column]);
    gameSpace.gameMap[++row][column].addSnake();
    gameSpace.snake.quadrants.push(gameSpace.gameMap[row][column]);
    gameSpace.addPray();
  }

  function start() {
    setTimeout(step, currentSpeed);
  }


  function step() {
    var coordinates,
      nextQuadrant;
    if (paused) {
      return;
    }
    coordinates = gameSpace.snake.getNextQuadrantCoordinates(nextDirection);


    if (isGameOver(coordinates, gameSpace)) {
      return;
    }

    nextQuadrant = gameSpace.gameMap[coordinates.row][coordinates.column];
    if (hasNoPlaceToMove(nextQuadrant)) {
      return;
    } else if (!nextQuadrant.hasPray) {
      gameSpace.snake.removeFromTail();
    }
    gameSpace.snake.quadrants.push(nextQuadrant);
    nextQuadrant.addSnake();

    start();
  }


  function hasNoPlaceToMove(nextQuadrant) {
    if (nextQuadrant.hasPray) {
      if (!gameSpace.addPray()) {
        gameSpace.displayTextOverSpace("You Won");
        return true;
      }
      if (currentSpeed > minSpeed) {
        currentSpeed--;
      }
      gameSpace.updateScore();
    }
    return false;
  }


  function isGameOver(coordinates) {
    var nextRow = gameSpace.gameMap[coordinates.row];
    if (!nextRow || !nextRow[coordinates.column] || nextRow[coordinates.column].hasSnake) {
      gameSpace.displayTextOverSpace("Game Over");
      return true;
    }
    return false;
  }

  function restart() {
    gameSpace = new GameSpace(rows, columns);
    gameSpace.displayTextOverSpace();
    init();
    start();
  }


  document.onkeydown = function (e) {
    e = e || window.event;
    if (gameSpace.directions[e.keyCode]) {
      nextDirection = e.keyCode;
    } else if (e.keyCode === 13) {
      restart();
    } else if (e.keyCode === 32) {
      if (paused) {
        start();
      }
      paused = !paused;
    }
  };


}