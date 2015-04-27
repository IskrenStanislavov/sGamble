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
        var that = this;
        this.cards.forEach(function(card, index){
            if (index === that.cards.length-1){
                card.collect(function(){
                    that.removeChild(card);
                    callback && callback();
                });
            } else {
                card.collect(function(){
                    that.removeChild(card);
                });
            }
        });
    };

    Player.prototype.dealCards = function(callback){
        var that = this;
        this.cards = [];
        Array.apply(null, Array(config.player.choices)).map(function (card, index){
            // http://stackoverflow.com/a/10050831/3345926
            setTimeout(function(){
                if (index === config.player.choices-1){
                    card = that.addChild(that.deck.dealPlayerCards(index, callback));
                } else {
                    card = that.addChild(that.deck.dealPlayerCards(index));
                }
                that.cards.push(card);
            }, index*300);
        });
    };

    Player.prototype.revealOnPick = function(onPick, callback){
        var that = this;
        function chooseWrapper(chosenCard){
            onPick && onPick();
            that.chosenCard = that.cards.splice(that.cards.indexOf(chosenCard), 1)[0];
            that.chosenCard.alpha = 1;

            that.chosenCard.reveal(function(){
                that.cards.forEach(function(card, index){
                    card.disable(chooseWrapper);
                    setTimeout(function(){
                        if (index === that.cards.length-1){
                            card.reveal(function(){
                                card.alpha = 0.8;
                                callback && callback();
                            });
                            that.cards.push(that.chosenCard);
                        } else {
                            card.reveal(function(){
                                card.alpha = 0.8;
                            });
                        }
                    }, index*300);
                });
            });
        };
        this.cards.forEach(function(card){
            card.enable(chooseWrapper);
        });
    };

    Player.prototype.getCardValue = function(){
        return this.chosenCard.getValue();
    };

    Player.prototype.startHighlights = function(){
        this.tweens = TweenMax.fromTo(this.cards,0.1,{alpha:1.0},{alpha:0.7}).yoyo(true).repeat(2);
    };

    Player.prototype.stopHighlights = function(){
        this.tweens.time(0).kill();
        this.tweens = undefined;
    };

    return Player;

});
