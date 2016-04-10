Spell = function() {
    this.cooldown = 0
    this.currentCooldown = 0
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

    /*eurecaServer.castRemoteAttack(character.id, {x: character.cursor.tx,
    											 y: character.cursor.ty});*/
};

// Leap

function Leap() {
    Spell.call(this);
    this.cooldown = 50;
}

Leap.prototype = Object.create(Spell.prototype);

Leap.prototype.constructor = Leap

Leap.prototype.cast = function(character){
    this.currentCooldown = this.cooldown/*
                if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                    this.mouseAlreadyUpdated = false;
                    this.nextFire = this.game.time.now + this.fireRate;
                    var bullet = this.bullets.getFirstDead();
                    bullet.lifespan = 5000;
                    bullet.reset(this.headSprite.x, this.headSprite.y);

                    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 500);
                }*/
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

// Poison

function Poison() {
    Spell.call(this);
    this.cooldown = 50;
}

Poison.prototype = Object.create(Spell.prototype);

Poison.prototype.constructor = Poison

Poison.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    eurecaServer.castRemoteAttack(character.id, {x: character.cursor.tx,
    											 y: character.cursor.ty});
};

