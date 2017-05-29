function Quadrant(row, column) {
    this.row = row;
    this.column = column;
    this.hasSnake = false;
    this.hasPray = false;
    this.element;
}

Quadrant.prototype.addSnake = function () {
    if (!this.hasSnake) {
        this.hasPray = false;
        this.hasSnake = true;
        this.element.className = 'snake';
    }
};

Quadrant.prototype.addPray = function () {
    if (!this.hasPray) {
        this.hasSnake = false;
        this.hasPray = true;
        this.element.className = 'pray';
    }
};

Quadrant.prototype.setEmpty = function () {
    if (this.hasPray || this.hasSnake) {
        this.hasSnake = false;
        this.hasPray = false;
        this.element.className = '';
    }
};