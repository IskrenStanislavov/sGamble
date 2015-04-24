        var button = new PIXI.Sprite(textureButton);
        button.buttonMode = true;
        button.anchor.x = 0.5;
        button.anchor.y = 0.5;
        button.position.x = buttonPositions[i*2];
        button.position.y = buttonPositions[i*2 + 1];
        // make the button interactive..
        button.interactive = true;
        // set the mousedown and touchstart callback..
        button.mousedown = button.touchstart = function(data){
            this.isdown = true;
            this.setTexture(textureButtonDown);
            this.alpha = 1;
        };
        // set the mouseup and touchend callback..
        button.mouseup = button.touchend = button.mouseupoutside = button.touchendoutside = function(data){
            this.isdown = false;
            if (this.isOver)
            {
                this.setTexture(textureButtonOver);
            }
            else
            {
                this.setTexture(textureButton);
            }
        };
        // set the mouseover callback..
        button.mouseover = function(data){
            this.isOver = true;
            if (this.isdown)
                return;
            this.setTexture(textureButtonOver);
        };
        // set the mouseout callback..
        button.mouseout = function(data){
            this.isOver = false;
            
            if (this.isdown)
                return;
            this.setTexture(textureButton)
        };
        button.click = function(data){
            console.log("CLICK!");
        };
        button.tap = function(data){
            console.log("TAP!!");
        };
