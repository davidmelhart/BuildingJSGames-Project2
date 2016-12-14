"use strict";

function JewelGameWorld (layer) {
    GameObjectList.call(this, layer);
    this.add(new SpriteGameObject(sprites.background, ID.layerBackground));
    this.rows = 10;
    this.columns = 5;

    var grid = new JewelGrid(this.rows, this.columns, ID.layerObjects);
    grid.position = new Vector2(85, 150);
    grid.cellWidth = 85;
    grid.cellHeight = 85;
    this.add(grid);

    for (var i = 0; i < this.rows * this.columns; i++) {
        grid.add(new Jewel());
    }
/*
    this.grid = new Array(this.rows*this.columns);

    for (var i = 0; i < this.rows * this.columns; i++) {
        var random = Math.floor(Math.random()*3) + 1;
        this.grid[i] = sprites["singleJewel" + random];
    }
*/
}

JewelGameWorld.prototype = Object.create(GameObjectList.prototype);
/*
JewelGameWorld.prototype.getGridValue = function (x, y) {
    var index = y * this.columns + x;
    return this.grid[index];
};

JewelGameWorld.prototype.setGridValue = function (x, y, value) {
    var index = y * this.columns + x;
    this.grid[index] = value;
};

JewelGameWorld.prototype.moveRowDown = function () {
    for (var y = this.rows - 2; y >= 0; y--) {
        for (var x = 0; x < this.columns ; x++) {
            this.setGridValue(x, y + 1, this.getGridValue(x,y));
        }
    }

    for (var x = 0; x < this.columns; x++) {
       var random = Math.floor(Math.random()*3) + 1;
       this.setGridValue(x, 0, sprites["singleJewel" + random]); 
    }
}

JewelGameWorld.prototype.moveLeft = function(selectRow) {
    var firstObject = this.getGridValue(0, selectRow);
    for (var x = 1; x < this.columns; x++) {

        this.setGridValue(x-1, selectRow, this.grid[x])
        //console.log(this.grid[x])
    }
    this.setGridValue(4, selectRow, firstObject)
}
*/

JewelGameWorld.prototype.handleInput = function (delta) {

};

JewelGameWorld.prototype.update = function (delta) {

};

JewelGameWorld.prototype.draw = function () {
    
    for (var i = 0; i < this._gameObjects.length; i++) {
        this._gameObjects[i].draw();
    }

    /*
    Canvas2D.drawImage(sprites.background);

    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.columns; col++) {
            var position = new Vector2(85+col*85, 150+row*85);         
            Canvas2D.drawImage(this.getGridValue(col, row), position);
        }
    }
    */
    //TEST MOUSE POS
    Canvas2D.drawImage(sprites.glitter, Mouse._position,0,1,new Vector2(18,20))
};

JewelGameWorld.prototype.reset = function () {
   
};

JewelGameWorld.prototype.isOutsideWorld = function (element) {
    return element.position.x < 0 || element.position.x > Game.size.x || position.y > Game.size.y;
};