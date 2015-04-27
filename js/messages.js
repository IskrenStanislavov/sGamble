define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Messages = function(){
        PIXI.DisplayObjectContainer.call(this);
        this.text = this.addChild(new PIXI.Text("", {"fill":"white"}));
        this.text.anchor = new PIXI.Point(0.5, 0.5);
        this.text.x = 512;
        this.text.y = 730;
    };

    Messages.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Messages.prototype.setText = function(textValue){
        this.text.setText(textValue);
    };

    Messages.prototype.setText = function(textValue){
        this.text.setText(textValue);
    };

    return Messages;
});
