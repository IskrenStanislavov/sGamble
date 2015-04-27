define(function(require){
    var PIXI        = require("libs/pixi");
    var Background  = require("background");
    var Deck        = require("deck");
    var Player      = require("player");
    var Dealer      = require("dealer");
    var Account     = require("account");
    var config      = require("config");
    var Question    = require("questionHolder");
    var Messages    = require("messages");

    var STATES = {
        INIT            :0,
        PREPARE_TABLE   :1,
        DEAL            :2,
        BET_CHOICE      :3,
        CARD_PICKING    :4,
        CALC_RESULT     :5,
        COLLECT_CARDS   :6,
    };

    var App = function(){
        PIXI.DisplayObjectContainer.call(this);

        this.question = question = this.addChild(new Question());
        this.background = this.addChild(new Background());
        this.messages = this.addChild(new Messages());

        this.deck = new Deck();
        this.dealer = this.addChild(new Dealer(this.deck));
        this.player = this.addChild(new Player(this.deck));

        this.account = this.addChild(new Account({balance:1000, bet:10}));
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
                    that.account.placeBet(mult);
                    that.dealer.reveal(function(){
                        that.setState(STATES.CARD_PICKING);
                    });
                });
            break;
            case STATES.CARD_PICKING:
                that.player.startHighlights();
                that.messages.setText("PICK A GREATER CARD TO WIN!");
                that.player.revealOnPick(function(){
                    that.messages.setText("");
                }, function(){
                    that.setState(STATES.CALC_RESULT);
                });
            break;
            case STATES.CALC_RESULT:
                if (that.player.getCardValue() === that.dealer.getCardValue()){
                    that.messages.setText("IT'S A TIE, TRY AGAIN!");
                    that.account.updateTie();
                } else if (that.player.getCardValue() > that.dealer.getCardValue()){
                    that.messages.setText("CONGRATULATIONS, YOU WON!");
                    that.account.updateWin();
                } else {
                    that.messages.setText("YOU LOST, BETTER LUCK NEXT TIME!");
                }
                setTimeout(function(){
                    that.setState(STATES.COLLECT_CARDS);
                }, 1500);
            break;
            case STATES.COLLECT_CARDS:
                that.dealer.collectCard();
                that.player.collectCards(function(){
                    that.deck.resetDeck();
                    console.log("end of round");
                    that.setState(STATES.DEAL);
                });
            break;
            default:
            throw "missing state:" + Object.keys(STATES)[state];
        }
    };

    return App;
});
