define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Dealer = function(deck){
        PIXI.DisplayObjectContainer.call(this);
        this.deck = deck;
        this.cards = [];

        this.dealerBG = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.dealerBG));
        this.dealerBG.anchor = new PIXI.Point(0, 0.5);
        this.dealerBG.x = 40;
        this.dealerBG.y = 339;

        this.x = this.hiddenX = -400;
    };

    Dealer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Dealer.prototype.show = function(callback){
        TweenMax.to(this, 0.5, {
            "x":0,
            "onComplete":callback
        });
    };

    Dealer.prototype.hide = function(callback){
        TweenMax.to(this, 0.5, {
            "x": this.hiddenX,
            "onComplete":callback
        });
    };

    Dealer.prototype.dealCard = function(callback){
        this.card = this.addChild(this.deck.pickRandom());
        this.slideToPlace(callback);
    };

    Dealer.prototype.slideToPlace = function(callback){
        TweenLite.fromTo(this.card, 0.5, config.deck.pilePosition, {x:85, y:240, onComplete:callback},0.3);
    };

    Dealer.prototype.collectCard = function(callback){
        this.card.collect();
    };

    Dealer.prototype.reveal = function(callback){
        this.card.reveal(callback);
    };

    Dealer.prototype.getCardValue = function(){
        this.card.getValue();
    };

    return Dealer;

});
