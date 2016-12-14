"use strict";

function GameObjectGrid (rows, columns, layer) {
	GameObjectList.call(this, layer);

	this.cellWidth = 0;
	this.cellHeight = 0;

	this._rows = rows;
	this._columns = columns;
}

GameObjectGrid.prototype = Object.create(GameObjectList.prototype);

Object.defineProperty(GameObjectGrid.prototype, "rows", 
	{
		get : function () {
			return this._rows;
		}
	});

Object.defineProperty(GameObjectGrid.prototype, "columns", 
	{
		get : function () {
			return this._columns;
		}
	});

GameObjectGrid.prototype.getGridValue = function (x, y) {
    var index = y * this._columns + x;
    return this._gameObjects[index];
};

GameObjectGrid.prototype.setGridValue = function (x, y, value) {
    var index = y * this._columns + x;
    this._gameObjects[index] = value;
};

GameObjectGrid.prototype.add = function (gameobject) {
	var row = Math.floor(this._gameObjects.length / this.columns);
	var col = this._gameObjects.length % this._columns;
	this._gameObjects.push(gameobject);
	gameobject.parent = this;
	gameobject.position = new Vector2(col * this.cellWidth, row * this.cellHeight);
};

GameObjectGrid.prototype.addAt = function (gameobject, row, col) {
	this._gameObjects[row * this._columns + col] = gameobject;
	gameobject.parent = this;
	gameobject.position = new Vector2(col * this.cellWidth, row * this.cellHeight);
};