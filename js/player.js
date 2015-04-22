define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var cards       = require("cards");

    var Player = function() {
        PIXI.DisplayObjectContainer.call(this);
        this.cards = [];
        // XXX: empty slots for the cards
        // XXX: assure player cannot pick the same card as the dealer
        // XXX: can simulate server this case.
    };

    Player.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Player.prototype.pickCards = function(){
        this.children.length = 0;
        var that = this;
        this.cards = Array.apply(null, Array(config.player.choices)).map(function (card, i) {
            // http://stackoverflow.com/a/10050831/3345926
            card = that.addChild(cards.pickRandom());
            card.x = i*100;
            card.y = 200;
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
