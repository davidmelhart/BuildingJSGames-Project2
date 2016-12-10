"use strict";

function Canvas2D_Singleton () {
	this._canvas = null;
	this._canvasContext = null;
    this._canvasOffset = Vector2.zero;
}

Canvas2D_Singleton.prototype.init = function (area, canvas) {
    this._area = document.getElementById(area);
	this._canvas = document.getElementById(canvas);
	this._canvasContext = this._canvas.getContext("2d");

    window.onresize = Canvas2D_Singleton.prototype.resize;
    this.resize();
};

Canvas2D_Singleton.prototype.resize = function () {
    var canvas = Canvas2D._canvas;
    var area = Canvas2D._area;

    var widthToHeight = Game.size.x / Game.size.y;

    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }
    
    area.style.width = newWidth + 'px';
    area.style.height = newHeight + 'px';

    area.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    area.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
    area.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
    area.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

    canvas.width = newWidth;
    canvas.height = newHeight;

    var offset = Vector2.zero;
    if (canvas.offsetParent) {
        do {
            offset.x += canvas.offsetLeft;
            offset.y += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
    }
    Canvas2D._canvasOffset = offset;
};

Object.defineProperty(Canvas2D_Singleton.prototype, 'scale', 
    {
        get : function () {
            return new Vector2(this._canvas.width / Game.size.x, this._canvas.height / Game.size.y);
        }
    });

Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
    {
        get: function () {
            return this._canvasOffset;
        }
    });

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x * scale, -origin.y * scale, sprite.width * scale, sprite.height * scale);
    this._canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};


Canvas2D_Singleton.prototype.clear = function () {
	this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D_Singleton.prototype.fill = function(color) {
    this._canvasContext.save();
    this._canvasContext.translate(0, 0);
	this._canvasContext.fillStyle = color;
	this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
	this._canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();