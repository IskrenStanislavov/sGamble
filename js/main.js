define(function(require){
    var PIXI        = require("libs/pixi");
    var Background  = require("background");
    var Deck        = require("deck");
    var Player      = require("player");
    var Dealer      = require("dealer");
    var config      = require("config");
    var Question    = require("questionHolder");
    var Messages    = require("messages");
    require("libs/TweenMax.min");

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
        var question = window.question = stage.addChild(new Question());
        window.background = stage.addChild(new Background);
        window.messages = stage.addChild(new Messages);

        var deck = new Deck();
        var dealer = window.dealer = stage.addChild(new Dealer(deck));
        var player = window.player = stage.addChild(new Player(deck));

        var betChosen = function(mult){
            player.disableButtons();
            player.setBet(mult);            
            dealer.reveal(function(){
                player.startHighlights();
                player.allowToPick();
            });
        };

        player.buttons.double.events.click.add(function(){
            betChosen(2);
        });

        player.buttons.half.events.click.add(function(){
            betChosen(1);
        });

        question.show(function(){
            question.buttons.yes.events.click.addOnce(function(){
                // console.log("fine lets play");
                question.disableButtons();
                question.hide(function(){
                    // console.log("show play spaces");
                    dealer.show(function(){
                        player.show(function(){
                            // console.log("ready shown");
                            dealer.pickCard(function(){
                                player.pickCards(function(){
                                    player.enableButtons();
                                });
                            });
                        });
                    });
                });
            })
            question.enableButtons();

        });


        // window.dealer = dealer;
        // window.player = player;
        // window.deck = deck;
        // window.PIXI = PIXI;

        requestAnimFrame(animate);
    };

    loader.load();

});
