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
    sprites.singleJewel1 = loadSprite("spr_single_jewel1.png");
    sprites.singleJewel2 = loadSprite("spr_single_jewel2.png");
    sprites.singleJewel3 = loadSprite("spr_single_jewel3.png");

    //TEST MOUSE POS
    sprites.glitter = loadSprite("spr_glitter.png");

};

Game.init = function () {

    // create the game world
    Game.gameWorld = new JewelGameWorld();
};