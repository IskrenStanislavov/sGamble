define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var facesTextures = new PIXI.BaseTexture(config.faceTextures.src);
    var backTextures = new PIXI.BaseTexture(config.backTextures.src);

    var Card = function(cardId, cardType) {
        PIXI.DisplayObjectContainer.call(this);
        this.face = this.addChild(new PIXI.Sprite.fromImage(config.faceTextures.src));
        this.face.alpha = 0;
        this.back = this.addChild(new PIXI.Sprite.fromImage(config.backTextures.src));
        this.back.alpha = 1;
    };
    Card.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Card.prototype.reveal = function(){
        this.face.alpha = 1;
        this.back.alpha = 0;
    };

    return {Card:Card};

});
