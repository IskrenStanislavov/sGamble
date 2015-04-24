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
        this.text.x = config.canvas.width - 40;
        this.text.y = 711;

        this.buttons = {
            yes   : this.addChild(new Button(config.buttons.yes)),
            no    : this.addChild(new Button(config.buttons.no)),
        };

    };

    QuestionHolder.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    return QuestionHolder;

});
