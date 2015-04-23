define(function(require) {
    var PIXI        = require("libs/pixi");
    var config      = require("config");


    var Card = function(cardId, cardSuit) {
        PIXI.DisplayObjectContainer.call(this);
        this.face = this.addChild(PIXI.Sprite.fromImage(cardSuit + cardId + ".png"));
        this.face.alpha = 0;

        this.back = this.addChild(PIXI.Sprite.fromImage(config.deck.backTextures));
        this.back.alpha = 1;
    };
    Card.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    Card.prototype.reveal = function(){
        this.face.alpha = 1;
        this.back.alpha = 0;
    };

    var Deck = function(){
        this.fullDeck = Array.apply(null, Array(52)).map(function (_, i) {
            console.log(i%13, Math.floor(i/13));
            return i;
        });

        this.resetDeck();

    };

    Deck.prototype.resetDeck = function() {
        this.currentAvailableCards = this.fullDeck.slice();
        // this.currentAvailableCards.shuffle();
    };

    Deck.prototype.pickRandom = function() {
        var choice = Math.floor(Math.random() * this.currentAvailableCards.length);

        var cardSuit = config.deck.suits[Math.floor(choice/13)];//config.deck.suits[Math.floor(Math.random()*config.deck.suits.length)];
        var cardId = config.deck.ids[choice%13];//config.deck.ids[Math.floor(Math.random()*config.deck.ids.length)];

        return new Card( cardId, cardSuit );
    };



    return Deck;

});
