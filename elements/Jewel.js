"use strict";

function Jewel () {
	SpriteGameObject.call(this, this.sprite, this.layer, 1);
	
	this.layer = ID.layerObjects;

	var random = Math.floor(Math.random()*3) + 1;
	this.sprite = sprites["singleJewel" + random];
}

Jewel.prototype = Object.create(SpriteGameObject.prototype);