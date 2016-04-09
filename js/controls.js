TouchControls = function(character)
{
    this.character = character
    this.game = game

    this.movementDirectionVectorX = 0
    this.movementDirectionVectorY = 0

    this.margin = 50
    this.segmentSize = 256
    this.offsetX = this.margin
    this.offsetY = window.innerHeight - this.segmentSize * 3 - this.margin
};

TouchControls.prototype.touch = function() {
    this.character.touchInputChanged = true
}

TouchControls.prototype.init = function create(game) {
    buttonR = game.add.button(this.offsetX + this.segmentSize, 
                              this.offsetY + this.segmentSize,
                              'button-circle', 
                              this.actionOnClick, 
                              this, 
                              0, 0, 0);
    buttonR.scale.x = 2
    buttonR.scale.y = 6
    buttonR.onInputUp.add(function() { this.touch(); this.movementDirectionVectorX = 0 }, this)
    buttonR.onInputDown.add(function() { this.touch(); this.movementDirectionVectorX = 1 }, this)

    buttonL = game.add.button(this.offsetX, 
                              this.offsetY + this.segmentSize,
                              'button-circle', 
                              this.actionOnClick, 
                              this, 
                              0, 0, 0);
    buttonL.scale.x = 2
    buttonL.scale.y = 6
    buttonL.onInputUp.add(function() { this.touch(); this.movementDirectionVectorX = 0 }, this)
    buttonL.onInputDown.add(function() { this.touch(); this.movementDirectionVectorX = -1 }, this)

    buttonT = game.add.button(this.offsetX, 
                              this.offsetY + this.segmentSize,
                              'button-circle', 
                              this.actionOnClick, 
                              this, 
                              0, 0, 0);
    buttonT.scale.x = 6
    buttonT.scale.y = 2
    buttonT.onInputUp.add(function() { this.touch(); this.movementDirectionVectorY = 0 }, this)
    buttonT.onInputDown.add(function() { this.touch(); this.movementDirectionVectorY = -1 }, this)

    buttonB = game.add.button(this.offsetX, 
                              this.offsetY + this.segmentSize + this.segmentSize,
                              'button-circle', 
                              this.actionOnClick, 
                              this, 
                              0, 0, 0);
    buttonB.scale.x = 6
    buttonB.scale.y = 2
    buttonB.onInputUp.add(function() { this.touch(); this.movementDirectionVectorY = 0 }, this)
    buttonB.onInputDown.add(function() { this.touch(); this.movementDirectionVectorY = 1 }, this)


    buttonL.fixedToCamera = true
    buttonR.fixedToCamera = true
    buttonT.fixedToCamera = true
    buttonB.fixedToCamera = true

}


TouchControls.prototype.actionOnClick = function() {
}

TouchControls.prototype.processInput = function(character) {
    
    if (this.movementDirectionVectorX == 1)
        character.shouldMoveRight = true
    if (this.movementDirectionVectorX == -1)
        character.shouldMoveLeft = true
    if (this.movementDirectionVectorY == 1)
        character.shouldMoveBottom = true
    if (this.movementDirectionVectorY == -1)
        character.shouldMoveTop = true
}
