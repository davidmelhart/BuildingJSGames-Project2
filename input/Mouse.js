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
    this.leftPressed = false;
};

function handleMouseMove(event) {
    var canvasScale = Canvas2D.scale;
    var canvasOffset = Canvas2D.offset;

    var MouseX = (event.pageX - canvasOffset.x) / canvasScale.x;
    var MouseY = (event.pageY - canvasOffset.y) / canvasScale.y;

    Mouse._position = new Vector2(MouseX, MouseY);

    //Mouse.position = new Vector2( event.pageX - Canvas2D._canvas.offsetLeft, event.pageY - Canvas2D._canvas.offsetTop );
}

function handleMouseDown(evt) {
    if (evt.which === 1) {
        if (!Mouse.leftDown)
            Mouse.leftPressed = true;
        Mouse.leftDown = true;
    }
}

function handleMouseUp(evt) {
    if (evt.which === 1)
        Mouse.leftDown = false;
}

var Mouse = new Mouse_Singleton();