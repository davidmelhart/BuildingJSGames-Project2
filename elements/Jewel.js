"use strict";

function Jewel () {	
	this.layer = ID.layerObjects;
	var random = Math.floor(Math.random()*3) + 1;
	this.sprite = sprites["singleJewel" + random];

	SpriteGameObject.call(this, this.sprite, this.layer, 1);
}

Jewel.prototype = Object.create(SpriteGameObject.prototype);

Jewel.prototype.update = function(delta) {
	SpriteGameObject.prototype.update.call(this, delta);

	if (this.parent.dragging) {
        return;
	} else {
		var anchor = this.parent.getAnchorPosition(this);
	}
	
	this.velocity = anchor.subtractFrom(this.position).multiplyWith(15);
};