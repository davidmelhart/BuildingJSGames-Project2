"use strict";

function Mouse_Singleton() {
    this._position = Vector2.zero;
    this._left = new ButtonState();
    this._middle = new ButtonState();
    this._right = new ButtonState();

    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

Mouse_Singleton.prototype.reset = function () {
    this._left.pressed = false;
    this._middle.pressed = false;
    this._right.pressed = false;
};

function handleMouseMove(event) {
    var canvasScale = Canvas2D.scale;
    var canvasOffset = Canvas2D.offset;

    var MouseX = (event.pageX - canvasOffset.x) / canvasScale.x;
    var MouseY = (event.pageY - canvasOffset.y) / canvasScale.y;

    Mouse._position = new Vector2(MouseX, MouseY);
}

function handleMouseDown(event) {
    handleMouseMove(event);

    if (event.which === 1) {
        if (!Mouse._left.down)
            Mouse._left.pressed = true;
        Mouse._left.down = true;
    } else if (event.which === 2) {
        if (!Mouse._middle.down)
            Mouse._middle.pressed = true;
        Mouse._middle.down = true;
    } else if (event.which === 3) {
        if (!Mouse._right.down)
            Mouse._right.pressed = true;
        Mouse._right.down = true;
    }
}

function handleMouseUp(event) {
    handleMouseMove(event);

    if (event.which === 1) {
        Mouse._left.down = false;
    } else if (event.which === 2) {
        Mouse._middle.down = false;
    } else if (event.which === 3) {
        Mouse._right.down = false;
    }
}

var Mouse = new Mouse_Singleton();