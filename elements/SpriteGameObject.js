"use strict";

function SpriteGameObject (sprite, layer, scale) {
	layer = typeof layer !== 'undefined' ? layer : 0;
	scale = typeof scale !== 'undefined' ? scale : 1;
	GameObject.call(this, layer);
	
	this.sprite = sprite;
	this.origin = Vector2.zero;
	this.rotation = 0;
	this.scale = scale;
}

SpriteGameObject.prototype = Object.create(GameObject.prototype);

Object.defineProperty(SpriteGameObject.prototype, 'center', {
		get: function () {
			return new Vector2(this.sprite.width/2, this.sprite.height/2);
		}
	});

Object.defineProperty(SpriteGameObject.prototype, 'width',
    {
        get: function () {
            return this.sprite.width;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, 'height',
    {
        get: function () {
            return this.sprite.height;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, 'size',
    {
        get: function () {
            return new Vector2(this.sprite.width, this.sprite.height);
        }
    });

SpriteGameObject.prototype.draw = function () {
	if (!this.visible && this.sprite === undefined) {
		return;
	} else {
		Canvas2D.drawImage(this.sprite, this.worldPosition, this.rotation, this.scale, this.origin)
	}
};