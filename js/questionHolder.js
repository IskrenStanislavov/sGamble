define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var QuestionHolder = function(){
        PIXI.DisplayObjectContainer.call(this);
        this.background = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.playerBG));
        this.background.scale.y = -1;
        this.background.anchor = new PIXI.Point(1, 0.5);
        this.background.x = config.canvas.width - 40;
        this.background.y = 711;

        this.text = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.question));
        this.text.anchor = new PIXI.Point(0.5, 0.5);
        this.text.x = 620;
        this.text.y = 585;

        this.buttons = {
            yes   : this.addChild(new Button(config.buttons.yes)),
            no    : this.addChild(new Button(config.buttons.no)),
        };

        this.y = this.hiddenY = 200;
    };

    QuestionHolder.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    QuestionHolder.prototype.enableButtons = function(){
        this.buttons.yes.enable();
        this.buttons.no.enable();
    };

    QuestionHolder.prototype.disableButtons = function(){
        this.buttons.yes.disable();
        this.buttons.no.disable();
    };

    QuestionHolder.prototype.show = function(callback){
        TweenMax.to(this, 0.5, {
            "y":0,
            "onComplete":callback
        });
    };

    QuestionHolder.prototype.hide = function(callback){
        TweenMax.to(this, 0.5, {
            "y": this.hiddenY,
            "onComplete":callback
        });
    };


    return QuestionHolder;

});
