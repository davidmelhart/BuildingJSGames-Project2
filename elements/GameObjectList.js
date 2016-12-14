"use strict";

function GameObjectList (layer) {
	layer = typeof layer !== 'undefined' ? layer : 0;
	GameObject.call(this, layer);

	this._gameObjects = [];
}

GameObjectList.prototype = Object.create(GameObject.prototype);

Object.defineProperty(GameObjectList.prototype, "length", {
    get: function () {
        return this._gameObjects.length;
    }
});

GameObjectList.prototype.add = function (gameobject) {
    this._gameObjects.push(gameobject);
    gameobject.parent = this;
    this._gameObjects.sort(function (a, b) {
        return a.layer - b.layer;
    });
};

GameObjectList.prototype.remove = function (gameobject) {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i) {
        if (gameobject !== this._gameObjects[i])
            continue;
        this._gameObjects.splice(i, 1);
        gameobject.parent = null;
        return;
    }
};

GameObjectList.prototype.at = function (index) {
    if (index < 0 || index >= this._gameObjects.length)
        return null;
    return this._gameObjects[index];
};

GameObjectList.prototype.clear = function () {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].parent = null;
    this._gameObjects = [];
};

GameObjectList.prototype.handleInput = function (delta) {
    for (var i = this._gameObjects.length - 1; i >= 0; --i)
       	this._gameObjects[i].handleInput(delta);
};

GameObjectList.prototype.update = function (delta) {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].update(delta);
};

GameObjectList.prototype.draw = function () {
    if (!this.visible)
        return;
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        if (this._gameObjects[i].visible)
            this._gameObjects[i].draw();
};

GameObjectList.prototype.reset = function () {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].reset();
};