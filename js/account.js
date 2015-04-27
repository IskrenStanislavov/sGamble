define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Account = function(data){
        PIXI.DisplayObjectContainer.call(this);
        this.value = data.balance;
        this.balance = this.addChild(new PIXI.Text("", {"fill":"white"}));
        this.balance.anchor = new PIXI.Point(0.5, 0.5);
        this.updateValue(this.value);

        this.bet = this.addChild(new PIXI.Text("Bet: 10", {"fill":"white"}));
        this.bet.anchor = new PIXI.Point(0.5, 0.5);
        this.bet.x = 15;
        this.bet.y = 30;
        this.basicBet = data.bet;
        this.updateBet(this.basicBet);

    };

    Account.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Account.prototype.updateValue = function(value){
        this.balance.setText("Balance: " + String(value));
    };

    Account.prototype.updateBet = function(bet){
        this.bet.setText("Bet: " + String(bet));
    };

    Account.prototype.placeBet = function(multiplier){
        this.betValue = multiplier * 0.5 * this.basicBet;
        this.updateBet(this.betValue);
        this.value -= this.betValue;
        this.updateValue(this.value);
    };

    Account.prototype.updateWin = function(){
        this.value += 2*this.betValue;
        this.updateValue(this.value);

        this.betValue = this.basicBet;
        this.updateBet(this.betValue);
    };

    return Account;
});
