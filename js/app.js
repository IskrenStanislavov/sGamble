define(function(require){
    var PIXI        = require("libs/pixi");
    var Background  = require("background");
    var Deck        = require("deck");
    var Player      = require("player");
    var Dealer      = require("dealer");
    var config      = require("config");
    var Question    = require("questionHolder");
    var Messages    = require("messages");

    var STATES = {
        INIT            :0,
        PREPARE_TABLE   :1,
        DEAL            :2,
        BET_CHOICE      :3,
        AWAIT_FOR_CHOICE:4,
    };

    var App = function(){
        PIXI.DisplayObjectContainer.call(this);

        this.question = question = this.addChild(new Question());
        this.background = this.addChild(new Background());
        this.messages = this.addChild(new Messages());

        this.deck = new Deck();
        this.dealer = this.addChild(new Dealer(this.deck));
        this.player = this.addChild(new Player(this.deck));

    };

    App.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    App.STATES = STATES;

    App.prototype.setState = function(state){
        var that = this;
        console.log("-->entering state:", Object.keys(STATES)[state]);
        switch (state){
            case STATES.INIT:
                that.question.show(function(){
                    that.messages.setText("CHOOSE ANWSER!");
                    that.question.buttons.yes.events.click.addOnce(function(){
                        that.messages.setText("");
                        that.question.disableButtons();
                        that.setState(STATES.PREPARE_TABLE);
                    })
                    that.question.enableButtons();
                });
            break;
            case STATES.PREPARE_TABLE:
                that.question.hide(function(){
                    that.dealer.show(function(){
                        that.player.show(function(){
                            that.setState(STATES.DEAL);
                        });
                    });
                });
            break;
            case STATES.DEAL:
                that.dealer.dealCard(function(){
                    that.player.dealCards(function(){
                        that.setState(STATES.BET_CHOICE);
                    });
                });
            break;
            case STATES.BET_CHOICE:
                that.messages.setText("CHOOSE YOUR BET!");
                that.player.enableButtons(function(mult){
                    that.messages.setText("");
                    that.player.disableButtons();
                    that.player.setBet(mult);
                    that.dealer.reveal(function(){
                        that.setState(STATES.AWAIT_FOR_CHOICE);
                    });
                });
            break;
            case STATES.AWAIT_FOR_CHOICE:
                that.player.startHighlights();
                that.messages.setText("PICK A GREATER CARD TO WIN!");
                that.player.allowPick(function(choice){
                    that.messages.setText("");
                    that.player.revealCard(choice);
                });
            break;
            default:
            // Player.prototype._dealCards = function(callback){
            //     var that = this;
            //     this.collectCards(function(){
            //         that.cards.forEach(function(card){
            //             that.removeChild(card);
            //         });
            //         that.dealCards(callback);
            //     });

            // };
            throw "missing state:"+Object.keys(STATES)[state];
        }
    };

    return App;
});
