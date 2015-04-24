define(function(require){
    var PIXI        = require("libs/pixi");
    var Background  = require("background");
    var Deck        = require("deck");
    var Player      = require("player");
    var Dealer      = require("dealer");
    var config      = require("config");

    var stage = new PIXI.Stage(0x3065a2);
    var renderer = PIXI.autoDetectRenderer(config.canvas.width, config.canvas.height, {
        "roundPixels": true,
        "antialias": true
    });

    document.body.appendChild(renderer.view);
    function animate(){
        renderer.render(stage);
        requestAnimFrame(animate);
    }
    // requestAnimFrame(animate);

    var loader = new PIXI.AssetLoader([
        config.deck.faceTextures,
        config.deck.backTextures,
        config.stageImages.logo,
        ]);

    loader.onComplete = function(){
        window.background = stage.addChild(new Background);


        var deck = new Deck();

        var player = stage.addChild(new Player(deck));
        var dealer = stage.addChild(new Dealer(deck));

        stage.swapChildren(player,dealer);

        dealer.pickCard(function(){
            player.pickCards(function(){
                dealer.reveal();
            });
        });

        window.dealer = dealer;
        window.player = player;
        // window.deck = deck;
        // window.PIXI = PIXI;

        requestAnimFrame(animate);
    };

    loader.load();

});
