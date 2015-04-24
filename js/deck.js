define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");


    var Card = function(cardId, cardSuit){
        PIXI.DisplayObjectContainer.call(this);
        this.face = this.addChild(PIXI.Sprite.fromImage(cardSuit + cardId + ".png"));
        this.face.alpha = 0;

        this.back = this.addChild(PIXI.Sprite.fromImage(config.deck.backTextures));
        this.back.alpha = 1;
        this.x = config.deck.pilePosition.x;
        this.y = config.deck.pilePosition.y;
    };
    Card.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    Card.prototype.reveal = function(){
        this.face.alpha = 1;
        this.back.alpha = 0;
    };

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
