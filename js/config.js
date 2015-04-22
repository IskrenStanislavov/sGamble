define(function(){
    return {
        "shapes": [
            "clubs",//спатия
            "diamonds",//каро
            "hearts",//купа
            "spades",//пика
        ],
        "faceTextures": {
            "src" : "images/cards-faces-classic.png",
        },

        "backTextures": {
            "src" : "images/cards_back.png",
        },

        "canvas": {
            "id": "game",
            "width": 800,
            "height": 600,
        },
    }; 
})
