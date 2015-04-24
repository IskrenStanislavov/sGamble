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

    };

    Dealer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Dealer.prototype.pickCard = function(callback){
        this.children.length = 0;
        this.addChild(this.dealerBG);

        this.card = this.addChild(this.deck.pickRandom());
        this.slideToPlace(callback);
    };

    Dealer.prototype.slideToPlace = function(callback){
        TweenLite.fromTo(this.card, 0.5, config.deck.pilePosition, {x:85, y:240, onComplete:callback},0.3);
    };

    Dealer.prototype.slideBack = function(){
        TweenLite.to(this.card, 0.5, config.deck.pilePosition);
    };

    Dealer.prototype.reveal = function(callback){
        this.card.reveal(callback);
    };

    return Dealer;

});
