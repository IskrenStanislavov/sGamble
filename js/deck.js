define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Card        = require("card");

    var Deck = function(){
        this.fullDeck = Array.apply(null, Array(52)).map(function (_, i){
            return {
                "suit": config.deck.suits[Math.floor(i/13)],
                "id": config.deck.ids[i%13]
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
        return new Card(cardData.id, cardData.suit);
    };

    return Deck;
});
