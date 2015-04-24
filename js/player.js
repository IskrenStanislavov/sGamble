define(function(require){
    var PIXI        = require("libs/pixi");
    var config      = require("config");
    var Button      = require("button");

    var Player = function(deck){
        PIXI.DisplayObjectContainer.call(this);
        this.deck = deck;
        this.cards = [];

        this.playerBG = this.addChild(new PIXI.Sprite.fromImage(config.stageImages.playerBG));
        this.playerBG.anchor = new PIXI.Point(1.0, 0.5);
        this.playerBG.x = config.canvas.width - 40;
        this.playerBG.y = 374;

        this.buttons = {
            double   : this.addChild(new Button(config.buttons.double)),
            half     : this.addChild(new Button(config.buttons.half)),
        };

        this.x = this.hiddenX = config.canvas.width;
    };

    Player.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

    Player.prototype.show = function(callback){
        TweenMax.to(this, 0.5, {
            "x":0,
            "onComplete":callback
        });
    };

    Player.prototype.hide = function(callback){
        TweenMax.to(this, 0.5, {
            "x": this.hiddenX,
            "onComplete":callback
        });
    };

    Player.prototype.enableButtons = function(){
        this.buttons.double.enable();
        this.buttons.half.enable();
    };

    Player.prototype.disableButtons = function(){
        this.buttons.double.disable();
        this.buttons.half.disable();
    };

    Player.prototype.pickCards = function(callback){
        // this.children.length = 0;
        // this.addChild(this.playerBG);
        var that = this;
        this.cards = Array.apply(null, Array(config.player.choices)).map(function (card, i){
            // http://stackoverflow.com/a/10050831/3345926
            card = that.addChild(that.deck.pickRandom());
            card.x = 307 + i * (card.width + config.player.cardsOffset);
            card.y = 240;
            return card;
        });
        this.slideToPlace(callback);
    };

    Player.prototype.slideToPlace = function(callback){
        var motionData = Object.create(config.deck.pilePosition);
        motionData.x += 1;
        motionData.y += 1;
        new TimelineMax({onComplete:callback}).staggerFrom(this.cards, 0.5, motionData, 0.3).add(callback);
    };

    Player.prototype.slideBack = function(){
        TweenLite.to(this.cards, 0.5, config.deck.pilePosition);
    };

    Player.prototype.reveal = function(chosen){
        this.cards.forEach(function(card, index){
            if (chosen == index){
                console.log(card);
            }
            card.reveal();
        });
    };

    return Player;

});
