define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Card = function(cardData){
        PIXI.DisplayObjectContainer.call(this);
        this.cardData = cardData;
        this.face = this.addChild(PIXI.Sprite.fromImage(cardData.picture));
        this.face.anchor = new PIXI.Point(0.5, 0.5);
        this.face.alpha = 0;
        this.face.scale.x = -1;
        this.face.x = this.face.texture.width/2;
        this.face.y = this.face.texture.height/2;

        this.back = this.addChild(PIXI.Sprite.fromImage(config.deck.backTextures));
        this.back.anchor = new PIXI.Point(0.5, 0.5);
        this.back.alpha = 1;
        this.back.scale.x = -1;
        this.back.x = this.back.texture.width/2;
        this.back.y = this.back.texture.height/2;

        this.x = config.deck.pilePosition.x;
        this.y = config.deck.pilePosition.y;
    };

    Card.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    Card.prototype.highlight = function(){
        TweenMax.to(this.back, 0.15, {alpha:0.9,scale:1.1, repeat:-1, yoyo:true});
    };

    Card.prototype.getValue = function(){
        return this.cardData.value;
    };

    Card.prototype.enable = function(){
        this.interactive = true;
        this.buttonMode = true;
    };

    Card.prototype.reveal = function(callback){
        var flip = new TimelineMax({"onComplete":callback});
        flip.add([
            TweenMax.to([this.back,this.face], 0.2, {"rotation":-Math.PI/9}),
            TweenMax.to([this.back.scale,this.face.scale], 0.2, {x:0,y:1}),
            ]);
        flip.set(this.back, {alpha:0, "rotation":-Math.PI/9});
        flip.set(this.face, {alpha:1, "rotation":-Math.PI/9});
        flip.add([
            TweenMax.to([this.back.scale,this.face.scale], 0.2, {x:1,y:1}),
            TweenMax.to([this.back,this.face], 0.2, {"rotation":0}),
            ]);
    };

    return Card;

});
