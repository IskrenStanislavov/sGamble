define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");

    var Player = function( deck ) {
        PIXI.DisplayObjectContainer.call(this);
        this.deck = deck;
        this.cards = [];
        // XXX: empty slots for the cards
        // XXX: assure player cannot pick the same card as the dealer
    };

    Player.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Player.prototype.pickCards = function(){
        this.children.length = 0;
        var that = this;
        this.cards = Array.apply(null, Array(config.player.choices)).map(function (card, i) {
            // http://stackoverflow.com/a/10050831/3345926
            card = that.addChild(that.deck.pickRandom());
            card.x = 307 + i * (card.width + config.player.cardsOffset);
            card.y = 290;
            return card;
        });
    };

    Player.prototype.reveal = function( chosen ) {
        this.cards.forEach(function(card, index){
            if ( chosen == index ){
                console.log(card);
            }
            card.reveal();
        });
    };

    return Player;

});
