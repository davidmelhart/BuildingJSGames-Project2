"use strict";

function Touch_Singleton () {
	this._touches = [];
	this._touchPresses = [];
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchEnd, false);
	document.addEventListener('touchcancel', handleTouchEnd, false);
	document.addEventListener('touchleave', handleTouchEnd, false);
	document.body.addEventListener('touchmove', handleTouchMove, false);
}

Object.defineProperty(Touch_Singleton.prototype, 'isTouchDevice', 
	{
		get : function () {
			return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
		}
	});

Touch_Singleton.prototype.getTouchIndexFromId = function (id) {
	for (var i = 0; i < this._touches.length; i++) {
		if (this._touches[i].identifier === id){
			return i;
		}
	}
	return -1;	
};

Touch_Singleton.prototype.getPosition = function (index) {
	var canvasScale = Canvas2D.scale;
	var canvasOffset = Canvas2D.offset;
	var touchX = (this._touches[index].pageX - canvasOffset.x) / canvasScale.x;
	var touchY = (this._touches[index].pageY - canvasOffset.y) / canvasScale.y;
	return new Vector2(touchX, touchY);
};

Touch_Singleton.prototype.containsTouch = function (rectangle) {
	for (var i=0; i < this._touches.length; i++) {
		if (rectangle.contains(this.getPosition(i))) {
			return true;
		}
	}
	return false;
};

function handleTouchStart (event) {
	event.preventDefault();
	var touches = event.changedTouches;
	for (var i = 0; i < touches.length, i++) {
		Touch._touches.push(touches[i]);
		Touch._touchPresses.push(true);
	}
}

function handleTouchEnd (event) {
	event.preventDefault();
	var touches = event.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var id = Touch.getTouchIndexFromId(touches[i].identifier);
		Touch._touches.splice(id,1);
		Touch._touchPresses.splice(id,1);
	}
}

function handleTouchMove (event) {
	event.preventDefault();
	var touches = event.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var id = Touch.getTouchIndexFromId(touches[i].identifier);
		Touch._touches.splice(id, 1, touches[i]);
	}
}