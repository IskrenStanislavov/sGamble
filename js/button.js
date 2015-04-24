define(function(require){
    var PIXI        = require("libs/pixi");
    var Signal      = require("libs/signals.min");

    var Button = function(config){

        this.normal = new PIXI.Texture.fromImage(config.normal);
        this.setTexture();

        this.over = new PIXI.Texture.fromImage(config.over);
        this.down = new PIXI.Texture.fromImage(config.down);

        PIXI.Sprite.call(this, this.normal);
        this.x = config.x;
        this.y = config.y;
        this.interactive = true;
        this.buttonMode = true;
        this.isDown = false;

        this.disable();
        this.events = {
            click: new Signal()
        };
    };

    Button.prototype = Object.create(PIXI.Sprite.prototype);

    Button.prototype.enable = function(){
        this.interactive = true;
        this.buttonMode = true;
        this.alpha = 1.0;
    };

    Button.prototype.disable = function(){
        this.interactive = false;
        this.buttonMode = false;
        this.alpha = 0.7;
    };

    Button.prototype.mousedown = Button.prototype.touchstart = function(data){
        this.isDown = true;
        this.setTexture(this.down);
        this.alpha = 1;
    };

    Button.prototype.mouseup = Button.prototype.touchend = Button.prototype.mouseupoutside = Button.prototype.touchendoutside = function(data){
        this.isDown = false;
        if (this.isOver){
            this.setTexture(this.over);
        } else {
            this.setTexture(this.normal);
        }
    };

    Button.prototype.mouseover = function(data){
        this.isOver = true;
        if (this.isDown){
            return;
        }
        this.setTexture(this.over);
    };

    Button.prototype.mouseout = function(data){
        this.isOver = false;
        
        if (this.isDown){
            return;
        }
        this.setTexture(this.normal)
    };

    Button.prototype.click = function(data){
        this.events.click.dispatch();
    };

    Button.prototype.tap = function(data){
        this.events.click.dispatch();
    };
    return Button;
});
