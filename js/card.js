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
        this.face.scale.y = -1;
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
    Card.prototype.getValue = function(){
        return this.cardData.value;
    };

    Card.prototype.collect = function(callback){
        this.hide(function(){
            var collectMotionData = Object.create(config.deck.pilePosition);
            collectMotionData.x += 1;
            collectMotionData.y += 1;
            collectMotionData.onComplete = callback;

            TweenLite.to(this, 0.5, collectMotionData, 0.3);
        }.bind(this));
    };

    Card.prototype.enable = function(callback){
        this.chosenCallback = callback;
        this.interactive = true;
        this.buttonMode = true;
        this.alpha = 0.7;
    };

    Card.prototype.disable = function(){
        this.chosenCallback = false;
        this.interactive = false;
        this.buttonMode = false;
    };

    Card.prototype.mousedown = Card.prototype.touchstart = function(data){
        this.isDown = true;
        this.scale = new PIXI.Point(1.1,1.1);
    };

    Card.prototype.mouseup = Card.prototype.touchend = Card.prototype.mouseupoutside = Card.prototype.touchendoutside = function(data){
        this.isDown = false;
        this.scale = new PIXI.Point(1.0,1.0);
        if (this.isOver){
            this.alpha = 1.0;
        } else {
            this.alpha = 0.7;
        }
    };

    Card.prototype.mouseover = function(data){
        this.isOver = true;
        if (this.isDown){
            return;
        }
        this.alpha = 1.0;
    };

    Card.prototype.mouseout = function(data){
        this.isOver = false;
        
        if (this.isDown){
            return;
        }
        this.alpha = 0.7;
    };

    Card.prototype.click = function(data){
        this.chosenCallback(this);
    };

    Card.prototype.tap = function(data){
        this.chosenCallback(this);
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

    Card.prototype.hide = function(callback){
        var flip = new TimelineMax({"onComplete":callback});
        flip.add([
            TweenMax.to([this.back,this.face], 0.2, {"rotation":-Math.PI/9}),
            TweenMax.to([this.back.scale,this.face.scale], 0.2, {x:0,y:1}),
            ]);
        flip.set(this.back, {alpha:1, "rotation":-Math.PI/9});
        flip.set(this.face, {alpha:0, "rotation":-Math.PI/9});
        flip.add([
            TweenMax.to([this.back.scale,this.face.scale], 0.2, {x:1,y:1}),
            TweenMax.to([this.back,this.face], 0.2, {"rotation":0}),
            ]);
    };

    return Card;

});
