"use strict";

function JewelGrid (rows, colums, layer) {
	GameObjectGrid.call(this, rows, colums, layer);

	this.dragging = false;
	this._dragRow = 0;
	this._draggingLastX = 0;
	this._touchIndex = 0;
}

JewelGrid.prototype = Object.create(GameObjectGrid.prototype);


JewelGrid.prototype.shiftRowLeft = function (selectedRow) {
    var firstObject = this.getGridValue(0, selectedRow);
    var positionOffset = firstObject.position.x;

    for (var x = 0; x < this._columns - 1; x ++) {
        this._gameObjects[selectedRow * this._columns + x] = this._gameObjects[selectedRow * this._columns + x + 1];
    }
    this._gameObjects[selectedRow * this._columns + (this._columns - 1)] = firstObject;
    firstObject.position = new Vector2(this._columns * this.cellWidth + positionOffset, selectedRow * this.cellHeight);
};

JewelGrid.prototype.shiftRowRight = function (selectedRow) {
	var lastObject = this.getGridValue(this._columns - 1, selectedRow);
    var positionOffset = lastObject.position.x - (this.columns - 1) * this.cellWidth;
    
    for (var x = this._columns - 1; x > 0; x -= 1)
        this._gameObjects[selectedRow * this._columns + x] = this._gameObjects[selectedRow * this._columns + (x - 1)];
    this._gameObjects[selectedRow * this._columns] = lastObject;
    lastObject.position = new Vector2(-this.cellWidth + positionOffset, selectedRow * this.cellHeight);
};