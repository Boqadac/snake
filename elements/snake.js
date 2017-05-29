function Snake(directions, invalidCurrentToNewDirections) {
  var self = this;
  self.quadrants = [];
  self.directions = directions;
  self.invalidCurrentToNewDirections = invalidCurrentToNewDirections;

  self.size = size;
  self.removeFromTail = removeFromTail;
  self.getCurrentDirection = getCurrentDirection;
  self.getNextQuadrantCoordinates = getNextQuadrantCoordinates;


  function size() {
    return self.quadrants.length;
  }

  function getLastQuadrantMinus(position) {
    var number = self.size() - 1 - (position ? position : 0);
    return self.quadrants[number];
  }

  function removeFromTail() {
    var first = self.quadrants.shift();
    first.setEmpty();
  }

  function getCurrentDirection() {
    var last = getLastQuadrantMinus(),
      beforeLast = getLastQuadrantMinus(1);
    if (last.row === beforeLast.row) {
      return last.column > beforeLast.column ? 39 : 37;
    } else {
      return last.row > beforeLast.row ? 40 : 38;
    }
  }

  function getNextQuadrantCoordinates(nextDirection) {
    var last = getLastQuadrantMinus(),
      currentDirection = self.getCurrentDirection();

    if (self.invalidCurrentToNewDirections[self.directions[currentDirection]] === self.directions[nextDirection]) {
      nextDirection = currentDirection;
    }

    if (self.directions[nextDirection] === 'left') {
      return {row: last.row, column: (last.column - 1)}
    } else if (self.directions[nextDirection] === 'right') {
      return {row: last.row, column: (last.column + 1)}
    } else if (self.directions[nextDirection] === 'up') {
      return {row: (last.row - 1), column: last.column}
    } else if (self.directions[nextDirection] === 'down') {
      return {row: (last.row + 1), column: last.column}
    }
  }
}