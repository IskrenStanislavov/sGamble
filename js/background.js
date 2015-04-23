define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Background = function( deck ) {
        PIXI.DisplayObjectContainer.call(this);
        this.logo = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.logo));
        this.logo.anchor = new PIXI.Point(0.5, 0.5);
        this.logo.x = 512;
        this.logo.y = 102;

        this.footer = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.footer));
        this.footer.anchor = new PIXI.Point(0.5, 1);
        this.footer.x = 512;
        this.footer.y = config.canvas.height;

    };

    Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    return Background;

});
