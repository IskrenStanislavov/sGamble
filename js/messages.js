define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Balance = function(startAmount){
        PIXI.DisplayObjectContainer.call(this);
        this.value = startAmount;
        this.balance = this.addChild(new PIXI.Text("", {"fill":"white"}));
        this.balance.anchor = new PIXI.Point(0.5, 0.5);
        this.updateValue(startAmount);
    };

    Balance.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Balance.prototype.updateValue = function(value){
        this.value = value;
        this.balance.setText("Balance: " + String(value));
    };

    var Messages = function(){
        PIXI.DisplayObjectContainer.call(this);
        this.text = this.addChild(new PIXI.Text("", {"fill":"white"}));
        this.text.anchor = new PIXI.Point(0.5, 0.5);
        this.text.x = 512;
        this.text.y = 730;

        this.bet = this.addChild(new PIXI.Text("Bet: 10", {"fill":"white"}));
        this.bet.anchor = new PIXI.Point(0.5, 0.5);
        this.bet.x = 135;
        this.bet.y = 745;

        this.balance = this.addChild(new Balance(1000));
        this.balance.x = 120;
        this.balance.y = 715;

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
