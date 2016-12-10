"use strict";

function PainterGameWorld () {
    this.score = 0;
}

PainterGameWorld.prototype.handleInput = function (delta) {

};

PainterGameWorld.prototype.update = function (delta) {

};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);
};

PainterGameWorld.prototype.reset = function () {
   this.score = 0;
};

PainterGameWorld.prototype.isOutsideWorld = function (element) {
    return element.position.x < 0 || element.position.x > Game.size.x || position.y > Game.size.y;
};