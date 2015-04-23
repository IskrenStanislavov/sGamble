define(function(require) {
    var PIXI        = require("libs/pixi");
    var Deck        = require("deck");
    var Player      = require("player");
    var Dealer      = require("dealer");
    var config      = require("config");

    var stage = new PIXI.Stage(0xFFFFFF);
    var renderer = PIXI.autoDetectRenderer(config.canvas.width, config.canvas.height, {
        "roundPixels": true,
        "antialias": true
    });

    document.body.appendChild(renderer.view);
    function animate() {
        renderer.render(stage);
        requestAnimFrame(animate);
    }
    requestAnimFrame(animate);

    var loader = new PIXI.AssetLoader([
        config.deck.faceTextures,
        config.deck.backTextures,
        ]);

    loader.onComplete = function() {
        var deck = new Deck();

        var player = stage.addChild(new Player(deck));
        player.pickCards();

        var dealer = stage.addChild(new Dealer(deck));
        dealer.pickCard();

        // window.dealer = dealer;
        // window.player = player;
        // window.deck = deck;
        // window.PIXI = PIXI;

        requestAnimFrame(animate);

        setTimeout(function(){
            dealer.reveal();
            player.reveal();
        }, 1500);
    };

    loader.load();

});
