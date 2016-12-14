"use strict";

function JewelGrid (rows, colums, layer) {
	GameObjectGrid.call(this, rows, colums, layer);

	this.dragging = false;
	this._dragRow = 0;
	this._draggingLastX = 0;
	this._touchIndex = 0;
}

JewelGrid.prototype = Object.create(GameObjectGrid.prototype);

JewelGrid.prototype.shiftRowLeft = function (selectRow) {
	var firstObject = this.getGridValue(0, selectRow);
	for (var x = 1; x < this._columns; x++) {
		//this.setGridValue(x-1; selectRow, this._gameObjects[x]);
	}
	this.setGridValue(4, selectRow, firstObject)
}