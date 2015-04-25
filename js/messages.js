define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Messages = function(){
        PIXI.DisplayObjectContainer.call(this);
        this.text = this.addChild(new PIXI.Text("some text"));
        this.text.anchor = new PIXI.Point(0.5, 0.5);
        this.text.x = 512;
        this.text.y = 755;
    };

    Messages.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Messages.prototype.show = function(callback){
        TweenMax.to(this, 0.5, {
            alpha: 1,
            "onComplete": callback
        });
    };

    Messages.prototype.hide = function(callback){
        TweenMax.to(this, 0.5, {
            alpha: 0,
            "onComplete": callback
        });
    };

    return Messages;
});
