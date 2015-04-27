define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var RESULT_MULTIPLIERS = {WIN:2, TIE:1};

    var Account = function(data){
        PIXI.DisplayObjectContainer.call(this);
        this.balanceText = this.addChild(new PIXI.Text("Balance: ", {"fill":"white"}));
        this.balanceText.anchor = new PIXI.Point(1, 0.5);

        this.balanceValue = data.balance;
        this.updateValue(this.balanceValue);

        this.betText = this.addChild(new PIXI.Text("Bet: ", {"fill":"white"}));
        this.betText.anchor = new PIXI.Point(1, 0.5);
        this.betText.y = 30;

        this.basicBet = data.bet;
        this.updateBet(this.basicBet);

        this.x = 150;
        this.y = 715;

    };

    Account.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Account.prototype.updateValue = function(value){
        this.balanceText.setText("Balance: " + String(value));
    };

    Account.prototype.updateBet = function(bet){
        this.betText.setText("Bet: " + String(bet));
    };

    Account.prototype.placeBet = function(multiplier){
        this.betValue = multiplier * 0.5 * this.basicBet;
        this.updateBet(this.betValue);
        this.balanceValue -= this.betValue;
        this.updateValue(this.balanceValue);
    };

    Account.prototype.updateWin = function(){
        this.update(RESULT_MULTIPLIERS.WIN);
    };

    Account.prototype.updateTie = function(){
        this.update(RESULT_MULTIPLIERS.TIE);
    };

    Account.prototype.update = function(multiplier){
        this.balanceValue += multiplier*this.betValue;
        this.updateValue(this.balanceValue);

        this.betValue = this.basicBet;
        this.updateBet(this.betValue);
    };

    return Account;
});
