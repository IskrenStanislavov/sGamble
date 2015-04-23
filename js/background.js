define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Background = function( deck ) {
        PIXI.DisplayObjectContainer.call(this);
        this.logo = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.logo));
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.x = 512;
        this.logo.y = 122;

        this.footer = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.footer));
        this.footer.anchor = new PIXI.Point(0.5, 1);
        this.footer.x = 512;
        this.footer.y = config.canvas.height;

        this.dealerBG = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.dealerBG));
        this.dealerBG.anchor = new PIXI.Point(0, 0.5);
        this.dealerBG.x = 40;
        this.dealerBG.y = 424;
        this.dealerBG.dims = this.dealerBG.getLocalBounds();

        this.playerBG = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.playerBG));
        this.playerBG.anchor = new PIXI.Point(1.0, 0.5);
        this.playerBG.x = config.canvas.width - 40;
        this.playerBG.y = 424;

    };

    Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Background.prototype.pickCard = function(){
    };

    return Background;

});
