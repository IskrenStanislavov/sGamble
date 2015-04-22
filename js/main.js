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
        // var player = stage.addChild(new Player());
        // player.pickCards();

        // var dealer = stage.addChild(new Dealer());
        // dealer.pickCard();

        var dealer = stage.addChild(cards.pickRandom());
        window.dealer = dealer;
        window.player = player;
        window.cards = cards;
        window.PIXI = PIXI;

        requestAnimFrame(animate);
    };

    loader.load();

});
