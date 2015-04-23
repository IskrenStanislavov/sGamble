define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Dealer = function( deck ) {
        PIXI.DisplayObjectContainer.call(this);
        this.deck = deck;
        this.cards = [];
    };

    Dealer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Dealer.prototype.pickCard = function(){
        this.children.length = 0;
        this.card = this.addChild(this.deck.pickRandom());
        this.card.x = 85;
        this.card.y = 290;
    };

    Dealer.prototype.reveal = function( chosen ) {
        this.card.reveal();
    };

    return Dealer;

});
