"use strict";

var sprites = {};
var sounds = {};

Game.assetLoader = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("sounds/" + sound, looping);
    };

    sprites.background = loadSprite("spr_background.jpg");

};

Game.init = function () {

    // create the game world
    Game.gameWorld = new PainterGameWorld();
};