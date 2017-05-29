function GameSpace(columns, rows) {
  var self = this,
    tableElement = document.getElementById("game-table"),
    gameOverElement = document.getElementById("game-over"),
    infoElement = document.getElementById("info");

  self.directions = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
  self.invalidCurrentToNewDirections = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up'
  };
  self.columns = columns;
  self.rows = rows;
  self.gameMap = [];
  self.snake = new Snake(self.directions, self.invalidCurrentToNewDirections);

  self.initMap = initMap;
  self.addPray = addPray;
  self.updateScore = updateScore;
  self.displayTextOverSpace = displayTextOverSpace;


  function initMap() {
    var columnsAndRowsToAppend = '';

    iterateAndCall(function (row, column) {
      if (!self.gameMap[row]) {
        self.gameMap[row] = [];
        columnsAndRowsToAppend += '<tr>';
      }
      self.gameMap[row][column] = new Quadrant(row, column);
      columnsAndRowsToAppend += '<td></td>';
      if (column === (self.columns - 1)) {
        columnsAndRowsToAppend += '</tr>';
      }
    });

    tableElement.innerHTML = columnsAndRowsToAppend;
    var rowElements = tableElement.getElementsByTagName('TD');

    iterateAndCall(function (row, column) {
      var quadrant = self.gameMap[row][column];
      quadrant.element = rowElements[(row * self.rows) + column];
    });
    updateScore();
  }

  function updateScore() {
    var score = self.snake.size();
    if(score > 1) {
      score -= 2;
    }
    infoElement.innerHTML = '<span>SCORE: '+(score) +' </span>';
  }


  function iterateAndCall(callBack) {
    for (var rowNum = 0; rowNum < self.rows; rowNum++) {
      for (var columnNum = 0; columnNum < self.columns; columnNum++) {
        callBack(rowNum, columnNum);
      }
    }
  }

  function addPray() {
    var withoutSnake = [];
    iterateAndCall(function (row, column) {
      var quadrant = self.gameMap[row][column];
      if (!quadrant.hasSnake) {
        withoutSnake.push(quadrant);
      }

    });
    if (withoutSnake.length === 0) {
      return undefined;
    }
    var addPrayTo = withoutSnake[getRandomInt(0, withoutSnake.length - 1)];
    addPrayTo.addPray();
    return addPrayTo;
  }

  function displayTextOverSpace(textToDisplay) {
    if(textToDisplay) {
      gameOverElement.className = '';
      gameOverElement.innerHTML = '<p class="center">' + textToDisplay + '</p>'
    } else {
      gameOverElement.className = 'hidden';
    }
  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}