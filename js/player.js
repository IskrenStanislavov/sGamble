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

        this.collectMotionData = Object.create(config.deck.pilePosition);
        this.collectMotionData.x += 1;
        this.collectMotionData.y += 1;

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

    Player.prototype.enableButtons = function(callback){
        var that = this;
        function callbackWrapper(m){
            that.buttons.double.events.click.remove(callbackWrapper);
            that.buttons.half.events.click.remove(callbackWrapper);
            callback && callback(m);
        }
        this.buttons.double.events.click.addOnce(callbackWrapper);
        this.buttons.half.events.click.addOnce(callbackWrapper);

        this.buttons.half.enable();
        this.buttons.double.enable();
    };

    Player.prototype.disableButtons = function(){
        this.buttons.half.disable();
        this.buttons.double.disable();
    };

    Player.prototype.collectCards = function(callback){
        if (this.cards){
            new TimelineMax({onComplete:callback}).staggerTo(this.cards, 0.25, Object.create(this.collectMotionData), 0.3);
        } else {
            callback && callback();
        }
    };

    Player.prototype.dealCards = function(callback){
        var that = this;
        this.cards = Array.apply(null, Array(config.player.choices)).map(function (card, i){
            // http://stackoverflow.com/a/10050831/3345926
            card = that.addChild(that.deck.pickRandom());
            card.x = 307 + i * (card.width + config.player.cardsOffset);
            card.y = 240;
            return card;
        });
        new TimelineMax({onComplete:callback}).staggerFrom(this.cards, 0.25, Object.create(this.collectMotionData), 0.3);
    };

    Player.prototype.allowPick = function(callback){
        this.cards.forEach(function(card, cardIndex){
            card.enable(function(){
                callback && callback(cardIndex, card.value);
            });
        });
    };

    Player.prototype._dealCards = function(callback){
        var that = this;
        this.collectCards(function(){
            that.cards.forEach(function(card){
                that.removeChild(card);
            });
            that.dealCards(callback);
        });

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

    Player.prototype.setBet = function(multiplier){
        this.multiplier = multiplier;
    };

    Player.prototype.startHighlights = function(){
        this.tweens = TweenMax.fromTo(this.cards,0.2,{alpha:1.0},{alpha:0.7}).yoyo(true).repeat(-1);
    };

    Player.prototype.stopHighlights = function(){
        this.tweens.time(0).kill();
        this.tweens = undefined;
    };

    return Player;

});
