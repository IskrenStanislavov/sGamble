define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var facesTextures = new PIXI.BaseTexture(config.faceTextures.src);
    var backTextures = new PIXI.BaseTexture(config.backTextures.src);

    var Card = function(cardId, cardType) {
        PIXI.DisplayObjectContainer.call(this);
        // var texture = new PIXI.Texture();

        this.face = this.addChild(new PIXI.Sprite.fromImage(config.faceTextures.src));
        this.face.alpha = 0;
        this.back = this.addChild(new PIXI.Sprite.fromImage(config.backTextures.src));
        this.back.alpha = 1;
        this.back.position = new PIXI.Point(1, 1);
        this.back.scale = new PIXI.Point(0.19,0.18);
    };
    Card.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Card.prototype.reveal = function(){
        this.face.alpha = 1;
        this.back.alpha = 0;
    };

    return {Card:Card};

});
