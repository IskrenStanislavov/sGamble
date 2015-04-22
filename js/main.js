require.config({
    baseUrl: 'js',
});

define(function(require) {
    var PIXI        = require("libs/pixi");
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
        "images/cards-faces-classic.png",
        "images/cards_back.png",
        ]);

    loader.onComplete = function(){
        var card = { x:10, y:1, w: 100, h:100};
        var face = stage.addChild(new cards.CardFace(card.x, card.y, card.w, card.h));
        face.x = 100;
        var back = stage.addChild(new cards.CardBack());
        back.x = 200;
        requestAnimFrame(animate);

    };

    loader.load();



});
