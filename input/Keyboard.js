"use strict";

function Keyboard_Singleton() {
	this._keyStates = [];
	for (var i = 0; i < 256; ++i) {
		this._keyStates.push(new ButtonState());
	}

    this.keyDown = -1;
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

Keyboard_Singleton.prototype.pressed = function (key) {
	return this._keyStates[key].pressed;
};

Keyboard_Singleton.prototype.down = function (key) {
	return this._keyStates[key].down;
};

function handleKeyDown(event) {
	var key = event.keyCode;
	if (key < 0 || key > 255) {
		return;
	} else if (!Keyboard._keyStates[key].down) {
		Keyboard._keyStates[key].pressed = true;
	}
	Keyboard._keyStates[key].down = true;
}

function handleKeyUp(event) {
    Keyboard.keyDown = -1;
}


}

var Keyboard = new Keyboard_Singleton();