define(function(require) {
    var PIXI        = require("libs/pixi");
    var cards       = require("cards");
    var config      = require("config");

    var stage = new PIXI.Stage(0x39435E);
    var renderer = PIXI.autoDetectRenderer(config.canvas.width, config.canvas.height, {
        "roundPixels": true,
        "antialias": true,
//      "transparent": true,
        "view": document.getElementById(config.canvas.id)});

    document.body.appendChild(renderer.view);
    requestAnimFrame(animate);
    function animate() {
        renderer.render(stage);
        // requestAnimFrame(animate);
    }

    var loader = new PIXI.AssetLoader([
        config.faceTextures.src,
        config.backTextures.src,
        ]);

    loader.onComplete = function() {
        var face = stage.addChild(new cards.Card("A", "clubs"));
        face.reveal();
        face.x = 100;
        var back = stage.addChild(new cards.Card("J", "spades"));
        back.x = 200;
        requestAnimFrame(animate);

    };

    loader.load();



});
