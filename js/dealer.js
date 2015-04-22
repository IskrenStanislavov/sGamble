define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var cards       = require("cards");

    var Dealer = function() {
        PIXI.DisplayObjectContainer.call(this);
        this.cards = [];
        // XXX: empty slot for the card
    };

    Dealer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Dealer.prototype.pickCard = function(){
        this.children.length = 0;
        this.card = this.addChild(cards.pickRandom());
        this.card.x = 100;
    };

    Dealer.prototype.reveal = function( chosen ) {
        this.card.reveal();
    };

    return Dealer;

});
