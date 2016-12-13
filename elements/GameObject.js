"use strict";

function GameObject () {
	this.position = Vector2.zero;
	this.velocity = Vector2.zero;
	this.visible = true
	this.parent = null;
	this.layer = 0;
}

Object.defineProperty(GameObject.prototype, 'worldPosition', 
	{
		get: function () {
			if (this.parent != null) {
				return this.parent.worldPosition.addTo(this.position);
			} else{
				return this.position.copy();
			}
		}
	});

GameObject.prototype.draw = function () {

};

GameObject.prototype.update = function (delta) {
	this.position.addTo(this.velocity.multiply(delta));
};
