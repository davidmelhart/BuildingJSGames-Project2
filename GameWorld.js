"use strict";

function JewelGameWorld () {
    this.score = 0;
    this.rows = 10;
    this.columns = 5;
    this.grid = new Array(this.rows*this.columns);

    for (var i = 0; i < this.rows * this.columns; i++) {
        var random = Math.floor(Math.random()*3) + 1;
        this.grid[i] = sprites["singleJewel" + random];
    }
}

JewelGameWorld.prototype.getGridValue = function (x, y) {
    var index = y * this.columns + x;
    return this.grid[index];
};

JewelGameWorld.prototype.setGridValue = function (x, y, value) {
    var index = y * this.colums + x;
    this.grid[index] = value;
};

JewelGameWorld.prototype.handleInput = function (delta) {

};

JewelGameWorld.prototype.update = function (delta) {

};
JewelGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);

    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.columns; col++) {
            var position = new Vector2(85+col*85, 150+row*85);         
            Canvas2D.drawImage(this.getGridValue(col, row), position);
        }
    }

    //TEST MOUSE POS
    Canvas2D.drawImage(sprites.glitter, Mouse._position,0,1,new Vector2(18,20))
};

JewelGameWorld.prototype.reset = function () {
   this.score = 0;
};

JewelGameWorld.prototype.isOutsideWorld = function (element) {
    return element.position.x < 0 || element.position.x > Game.size.x || position.y > Game.size.y;
};