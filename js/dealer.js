define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Dealer = function( deck ) {
        PIXI.DisplayObjectContainer.call(this);
        this.deck = deck;
        this.cards = [];

        this.dealerBG = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.dealerBG));
        this.dealerBG.anchor = new PIXI.Point(0, 0.5);
        this.dealerBG.x = 40;
        this.dealerBG.y = 339;

    };

    Dealer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Dealer.prototype.pickCard = function(){
        this.children.length = 0;
        this.addChild(this.dealerBG);

        this.card = this.addChild(this.deck.pickRandom());
        this.card.x = 85;
        this.card.y = 240;
    };

    Dealer.prototype.reveal = function( chosen ) {
        this.card.reveal();
    };

    return Dealer;

});
