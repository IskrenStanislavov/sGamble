define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Card        = require("card");

    var Deck = function(){
        this.fullDeck = Array.apply(null, Array(52)).map(function (_, i){
            var id = config.deck.ids[i%13];
            var suit = config.deck.suits[Math.floor(i/13)];
            return {
                "id": id,
                "suit": suit,
                "picture": String(suit) + String(id) + ".png",
                "value": config.deck.values[i%13],
            };
        });
        this.resetDeck();
    };

    Deck.prototype.resetDeck = function(){
        this.currentAvailableCards = this.fullDeck.slice();
        // this.currentAvailableCards.shuffle();
    };

    Deck.prototype.pickRandom = function(){
        var choice = Math.floor(Math.random() * this.currentAvailableCards.length);
        var cardData = this.currentAvailableCards.splice(choice, 1)[0];
        return new Card(cardData);
    };

    return Deck;
});
