Spell = function() {
    this.cooldown = 0
    this.currentCooldown = 0
};

Spell.prototype.cast = function(character) {
    this.currentCooldown = this.cooldown
    console.log("Casting spell")
}

Spell.prototype.onCooldown = function(character) {
    game.time.now
}

// Healing Spell

function HealingSpell() {
    Spell.call(this);
}

HealingSpell.prototype = Object.create(Spell.prototype);

HealingSpell.prototype.constructor = HealingSpell

HealingSpell.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

    character.health = character.health + healingSpellHealingPercentage
};

// Fireball

function Fireball() {
    Spell.call(this);
}

Fireball.prototype = Object.create(Spell.prototype);

Fireball.prototype.constructor = Fireball

Fireball.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

};

// Leap

function Leap() {
    Spell.call(this);
}

Leap.prototype = Object.create(Leap.prototype);

Leap.prototype.constructor = Leap

Leap.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

};

// Spike

function Spike() {
    Spell.call(this);
}

Spike.prototype = Object.create(Spike.prototype);

Spike.prototype.constructor = Spike

Spike.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

};

// Cold Sphere

function ColdSphere() {
    Spell.call(this);
}

ColdSphere.prototype = Object.create(ColdSphere.prototype);

ColdSphere.prototype.constructor = ColdSphere

ColdSphere.prototype.cast = function(character){
    this.currentCooldown = this.cooldown

};

// Poison

function Poison() {
    Spell.call(this);
}

Poison.prototype = Object.create(Poison.prototype);

Poison.prototype.constructor = Poison

Poison.prototype.cast = function(character){
    this.currentCooldown = this.cooldown
};

