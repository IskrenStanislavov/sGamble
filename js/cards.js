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

    Card.pickRandom = function(){
        var cardSuit = config.deck.suits[Math.floor(Math.random()*config.deck.suits.length)];
        var cardId = config.deck.ids[Math.floor(Math.random()*config.deck.suits.length)];
        return new Card( cardId, cardSuit );
    };
    return {Card:Card, pickRandom:Card.pickRandom};

});
