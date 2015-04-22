define(function(require) {
    var PIXI        = require("libs/pixi");
    var cards       = require("cards");
    var config      = require("config");

    var stage = new PIXI.Stage(0xFFFFFF);
    var renderer = PIXI.autoDetectRenderer(config.canvas.width, config.canvas.height, {
        "roundPixels": true,
        "antialias": true,
//      "transparent": true,
        "view": document.getElementById(config.canvas.id)});

    document.body.appendChild(renderer.view);
    requestAnimFrame(animate);
    function animate() {
        renderer.render(stage);
        requestAnimFrame(animate);
    }

    var loader = new PIXI.AssetLoader([
        config.deck.faceTextures,
        config.deck.backTextures,
        ]);

    loader.onComplete = function() {
        // dealer.pickCard();
        // player.pickCards();
        var cardSuit = config.deck.suits[Math.floor(Math.random()*config.deck.suits.length)];
        var cardId = config.deck.ids[Math.floor(Math.random()*config.deck.suits.length)];
        var playerCard = stage.addChild(new cards.Card( cardId, cardSuit ));
        // playerCard.reveal();
        playerCard.x = 100;
        window.face = playerCard;
        window.cards = cards;
        window.PIXI = PIXI;

        requestAnimFrame(animate);
    };

    loader.load();

});
