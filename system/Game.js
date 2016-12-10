"use strict";

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

function Game_Singleton () {
	this._size = undefined;
	this.gameWorld = undefined;
	this.spritesLoading = 0;
}

Object.defineProperty(Game_Singleton.prototype, "size", 
	{
		get : function () {
			return this._size;
		}
	});

//Starts the Game by calling in the assets and the loading loop
Game_Singleton.prototype.startup = function (area, canvas, x, y) {
	this._size = new Vector2(x, y);
	Canvas2D.init(area, canvas);
	this.assetLoader();
	this.loadingLoop();
};

//Blank function, the 'app' fills it in with the required assets
Game_Singleton.prototype.assetLoader = function () {

};

//The 'app' uses this method to load up sprites, it uses the Game.spritesLoading method to monitor the loading
Game_Singleton.prototype.loadSprite = function(imageName) {
	var image = new Image();
	image.src = imageName;
	this.spritesLoading += 1;
	image.onload = function () {
		Game.spritesLoading -=1;
	}
	return image;
};

//This loop is run whenever the sprites are loading, if not, it initializes the game and starts the main loop
Game_Singleton.prototype.loadingLoop = function () {
	if (!this.spritesLoading > 0)
        requestAnimationFrame(Game.loadingLoop);
    else {
        Game.init();
        requestAnimationFrame(Game.mainLoop);
    }
};

//Blank function, the 'app' fills it in with the starting parameters and sets the proper game world
Game_Singleton.prototype.init = function () {
	
};

//This is the main loop that runs under the whole game, it calls the handle input, update and draw functions
Game_Singleton.prototype.mainLoop = function () {
	var delta = 1 / 60;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
};

var Game = new Game_Singleton();