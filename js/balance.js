define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Balance = function(startAmount, basicBet){
        PIXI.DisplayObjectContainer.call(this);
        this.value = startAmount;
        this.balance = this.addChild(new PIXI.Text("", {"fill":"white"}));
        this.balance.anchor = new PIXI.Point(0.5, 0.5);
        this.updateValue(startAmount);

        this.bet = this.addChild(new PIXI.Text("Bet: 10", {"fill":"white"}));
        this.bet.anchor = new PIXI.Point(0.5, 0.5);
        this.bet.x = 15;
        this.bet.y = 30;
        this.basicBet = basicBet;
        this.updateBet(this.basicBet);

    };

    Balance.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Balance.prototype.updateValue = function(value){
        this.balance.setText("Balance: " + String(value));
    };

    Balance.prototype.updateBet = function(bet){
        this.bet.setText("Bet: " + String(bet));
    };

    Balance.prototype.placeBet = function(multiplier){
        this.betValue = multiplier * 0.5 * this.basicBet;
        this.bet.setText("Bet: " + String(this.betValue));
        this.value -= this.betValue;
        this.updateValue(this.value);
    };

    return Balance;
});
