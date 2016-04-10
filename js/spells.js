Spell = function() {
    this.cooldown = 0
    this.currentCooldown = 0
    this.spellPower = 0;
};

Spell.prototype.cast = function(character) {
    this.currentCooldown = this.cooldown
    console.log("Casting spell")
}

Spell.prototype.onCooldown = function(character) {
    return this.currentCooldown <= 0;
}

// Healing Spell

function HealingSpell() {	
    Spell.call(this);
    this.cooldown = 100;
}

HealingSpell.prototype = Object.create(Spell.prototype);

HealingSpell.prototype.constructor = HealingSpell

HealingSpell.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    eurecaServer.updateHP(character.id, healingSpellHealingPercentage);
};

// Fireball

function Fireball() {
    Spell.call(this);
    this.cooldown = 50;
}

Fireball.prototype = Object.create(Spell.prototype);

Fireball.prototype.constructor = Fireball

Fireball.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    eurecaServer.castRemoteAttack(character.id, {x: character.cursor.tx,
    											 y: character.cursor.ty});
};

// Leap

function Leap() {
    Spell.call(this);
    this.cooldown = 10;

    this.jumpDist = 512;
}

Leap.prototype = Object.create(Spell.prototype);

Leap.prototype.constructor = Leap

Leap.prototype.cast = function(character){
	if (this.onCooldown() == false)
		return
	console.log("OK")
    this.currentCooldown = this.cooldown

    var curPos = new Phaser.Point(character.baseSprite.x, character.baseSprite.y);
    var target = new Phaser.Point(character.cursor.tx, character.cursor.ty);


    var dist = Phaser.Math.min(this.jumpDist, 
    			Phaser.Math.distance(curPos.x, curPos.y, target.x, target.y));

    var offset_x = dist * Math.cos(Phaser.Math.angleBetweenPoints(curPos, target));
    var offset_y = dist * Math.sin(Phaser.Math.angleBetweenPoints(curPos, target));
    target.x = curPos.x + offset_x;
    target.y = curPos.y + offset_y;

    /*var isCollision = false;
    for (var obst in character.game.obstacles)
    {
    	var a = new Phaser.Rectangle(obst.x, obst.y, obst.width, obst.height);
    	var b = new Phaser.Rectangle(target.x - 32, target.y - 32, 64, 64);
    	if (Phaser.Rectangle.intersects(a, b))
    	{
    		isCollision = true;
    		break;
    	}
    }
    if (!isCollision)*/
    	eurecaServer.doLeap(character.id, target.x, target.y);
};

// Spike

function Spike() {
    Spell.call(this);
    this.cooldown = 50;
}

Spike.prototype = Object.create(Spell.prototype);

Spike.prototype.constructor = Spike

Spike.prototype.cast = function(character){
    this.currentCooldown = this.cooldown
                /*this.wall.reset(this.headSprite.x, this.headSprite.y)
                this.wall.lifespan = 5000;
                this.wall.rotation = this.game.physics.arcade.moveToObject(this.wall, target, 0)*/

};

// Cold Sphere

function ColdSphere() {
    Spell.call(this);
    this.cooldown = 50;
}

ColdSphere.prototype = Object.create(Spell.prototype);

ColdSphere.prototype.constructor = ColdSphere

ColdSphere.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    eurecaServer.castRemoteAttack(character.id, {x: character.cursor.tx,
    											 y: character.cursor.ty});
};

// Vape

function Vape() {
    Spell.call(this);
    this.cooldown = 50;
}

Vape.prototype = Object.create(Spell.prototype);

Vape.prototype.constructor = Vape

Vape.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    eurecaServer.castRemoteAttack(character.id, {x: character.cursor.tx,
    											 y: character.cursor.ty});
};

