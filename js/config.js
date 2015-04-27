define(function(){
    var cardValues = Array.apply(null, Array(13)).map(function (_, i){
        // http://stackoverflow.com/a/10050831/3345926
        return (i+2);
    });

    var cardIds = cardValues.map(function (cardValue, i){
        // http://stackoverflow.com/a/10050831/3345926
        switch(i+1){
            case 13:
                return "A";
            case 10:
                return "J";
            case 11:
                return "Q";
            case 12:
                return "K";
            default:
                return String(cardValue);
        }
        throw "wtf";
    });

    return {
        "deck":{
            // "suits": ["пика", "купа", "каро", "спатия"],
            "suits": ["spades", "hearts", "diamonds", "clubs"],
            "ids": cardIds,
            "values": cardValues,
            "faceTextures" : "images/deck.json",
            "backTextures" : "images/back.png",
            "pilePosition" : { "x":40, "y": 490 }
        },

        "player": {
            "cardsOffset": 16,//in pixels
            "choices": 5
        },

        "stageImages": {
            "logo"      :"images/logo.png",
            "dealerBG"  :"images/dealerBG.png",
            "playerBG"  :"images/playerBG.png",
            "deckPile"  :"images/deckPile.png",
            "question"  :"images/gambleQuestion.png",
            "footer"    :"images/footerBar.png"
        },

        "buttons":{
            "double":{
                "x"        : 700,
                "y"        : 440,
                "value"    : 2,
                "normal"   : "images/doubleNormal.png",
                "down"     : "images/doubleDown.png",
                "over"     : "images/doubleHover.png"
            },
            "half":{
                "x"        : 330,
                "y"        : 440,
                "value"    : 1,
                "normal"   : "images/doubleHalfNormal.png",
                "down"     : "images/doubleHalfDown.png",
                "over"     : "images/doubleHalfHover.png"

            },
            "yes":{
                "x"        : 330,
                "y"        : 610,
                "value"    : true,
                "normal"   : "images/yesNormal.png",
                "down"     : "images/yesDown.png",
                "over"     : "images/yesHover.png"
            },
            "no":{
                "x"        : 700,
                "y"        : 610,
                "value"    : false,
                "normal"   : "images/noNormal.png",
                "down"     : "images/noDown.png",
                "over"     : "images/noHover.png"
            }
        },

        "canvas": {
            "width": 1024,
            "height": 768,
            "id": "game"
        },
    }; 
})
