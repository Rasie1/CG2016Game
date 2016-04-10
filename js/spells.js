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
    this.cooldown = 50;
}

Leap.prototype = Object.create(Spell.prototype);

Leap.prototype.constructor = Leap

Leap.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

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

