define(function(require){
    require("libs/TweenMax.min");

    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var App         = require("app");


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
        requestAnimFrame(animate);
        window.app = stage.addChild(new App());
        window.app.setState(App.STATES.INIT);
    };

    loader.load();

});
