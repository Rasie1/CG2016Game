var myId = 0;

var land;

var player;
var charactersList;
var explosions;

var cursors = {
    left:false,
    right:false,
    up:false,
    down:false,
    fire:false,
    spell0:false,
    spell1:false,
    spell2:false,
    spell3:false
};
var touchControls

var bullets;

var ready = false;
var eurecaServer;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
if (screenWidth > maxGameWidth){
	var gameWidth = maxGameWidth;
}
else {
	var gameWidth = screenWidth;
};
if (screenHeight > maxGameHeight){
	var gameHeight = maxGameHeight;
}
else {
	var gameHeight = screenHeight;
};


console.log(gameWidth);

var itemTimer = 0
var items = []

var game = new Phaser.Game(
	gameWidth, 
	gameHeight, 
	Phaser.CANVAS, 
	'phaser-example', 
	{ preload: preload, create: eurecaClientSetup, update: update, render: render }
);


var onScreenChange = function(){
	console.log('changed');
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	/*if(screenWidth>maxGameWidth){
		gameWidth = maxGameWidth;
	}
	else{
		gameWidth = screenWidth;
	};
	if(screenHeight>maxGameHeight){
		gameHeight = maxGameHeight;
	}
	else{
		gameHeight = screenHeight;
	};
	game.scale.maxWidth = gameWidth;
	game.scale.maxHeight = gameHeight;*/
	game.scale.setScreenSize();
	land.width = gameWidth;
	land.height = gameHeight;

	game.camera.deadzone.x = (gameWidth-gameWidth*cameraDeadzoneWidth)/2;
	game.camera.deadzone.y = (gameHeight-gameHeight*cameraDeadzoneHeight)/2;
	game.camera.deadzone.width = gameWidth*cameraDeadzoneWidth;
	game.camera.deadzone.height = gameHeight*cameraDeadzoneHeight;
    console.log(player)
	game.camera.focusOnXY(player.x, player.y);
}
// window.addEventListener("resize",onScreenChange);


function preload () {

    game.load.atlas('character', 'assets/tanks.png', 'assets/tanks.json');
    game.load.atlas('enemy', 'assets/enemy-tanks.png', 'assets/tanks.json');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('button-circle', 'assets/button_circle.png');
    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
    game.load.image('item1', 'assets/item0.png')
    game.load.image('item2', 'assets/item1.png')
    game.load.image('item3', 'assets/item2.png')
    game.load.image('aura', 'assets/aura.png')
    
}

function initializeInput ()
{
    if (!game.device.desktop) {
        touchControls = new TouchControls(player)
        touchControls.init()
    }
}

function handleInput()
{
    cursors.up = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    cursors.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    cursors.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    cursors.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    cursors.fire = game.input.keyboard.addKey(Phaser.Mouse.LEFT_BUTTON)
    
    cursors.spell0 = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    cursors.spell1 = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    cursors.spell2 = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    cursors.spell3 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR)

    if (!game.device.desktop)
        this.touchControls.processInput();
    
}

function create () 
{
    game.world.setBounds(mapX, 
                         mapY, 
                         mapWidth, 
                         mapHeight);
    game.stage.disableVisibilityChange  = true;
    
    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'earth');

    land.fixedToCamera = true;
    
    charactersList = {};

    
    player = new Character(myId, game, character);
    player.healthBar = game.add.text(10, 10, "HP: 99999%", 
        { font: "32px Arial", fill: "#ffffff", align: "left" });
    player.healthBar.fixedToCamera = true
    player.healthBar.cameraOffset.setTo(10, 10);
    charactersList[myId] = player;
    baseSprite = player.baseSprite;
    headSprite = player.headSprite;
    baseSprite.x = 0;
    baseSprite.y = 0;
    bullets = player.bullets;

    initDebugMessage(game);

    //  Explosion pool
    explosions = game.add.group();

    for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }

    baseSprite.bringToTop();
    headSprite.bringToTop();

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setScreenSize(true); 

    game.camera.follow(baseSprite);
    game.camera.deadzone = 
        new Phaser.Rectangle((gameWidth - gameWidth * cameraDeadzoneWidth)/2, 
                             (gameHeight-gameHeight*cameraDeadzoneHeight)/2, 
                             gameWidth*cameraDeadzoneWidth, 
                             gameHeight*cameraDeadzoneHeight);
    game.camera.focusOnXY(baseSprite.x, baseSprite.y);

    initializeInput()

}

function makeItem(x,y) {
	var found = false
	var elementForDrop = Math.round(Math.random()*2)+1
	for (var i in items) 
		if (!items[i].alive && items[i].element == elementForDrop) 
			eurecaServer.activateItem(i, x, y);

	if (!found && items.length < 10) 
		eurecaServer.createItem(x, y, elementForDrop);

}

function update () {
	for (var j in charactersList)
		for (var i in items) 
            game.physics.arcade.overlap(items[i], charactersList[j].baseSprite, 
                                        function(a){charactersList[j].pickUpItem(items[i])}, 
                                        null, 
                                        this)
	if (itemTimer == 60) {
		makeItem(Math.random() * mapHeight, Math.random() * mapWidth);
		if (player.health < 30)
			eurecaServer.updateHP(myId, +1);
		itemTimer = 0
	}
	itemTimer++
    
    //do not update if client not ready
    if (!ready) 
        return;
    
    player.input.left = cursors.left.isDown;
    player.input.right = cursors.right.isDown;
    player.input.up = cursors.up.isDown;
    player.input.down = cursors.down.isDown;

    player.input.fire = game.input.activePointer.isDown;
    player.input.tx = game.input.x + game.camera.x;
    player.input.ty = game.input.y + game.camera.y;

    player.input.spell0 = cursors.spell0.isDown;
    player.input.spell1 = cursors.spell1.isDown;
    player.input.spell2 = cursors.spell2.isDown;
    player.input.spell3 = cursors.spell3.isDown;

    handleInput()

	player.healthBar.setText("HP: " + player.health + "%");
	
	headSprite.rotation = game.physics.arcade.angleToPointer(headSprite);	
	//baseSprite.rotation = game.physics.arcade.angleToPointer(baseSprite);	

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    for (var i in charactersList)
    {
		if (!charactersList[i]) continue;
		var curBullets = charactersList[i].bullets;
		for (var j in charactersList)
		{
			if (!charactersList[j]) continue;
			if (j!=i) 
			{
			
				var targetCharacter = charactersList[j].baseSprite;
				
				//game.physics.arcade.overlap(curBullets, targetCharacter, bulletHitPlayer, null, this);
				if (game.physics.arcade.overlap(targetCharacter, curBullets, bulletHitPlayer, null, this)
					&& charactersList[i].baseSprite.id == player.baseSprite.id)
				{
					console.log('talk server about collide');
					eurecaServer.updateHP(targetCharacter.id, -10);
				}
			}
			if (charactersList[j].alive)
			{
				charactersList[j].update();
			}			
		}
    };
    for (i = 0; i < bullets.children.length; i++) {
    	if(bullets.children[i].alive && bullets.children[i].lifespan <= 0)
    		bullets.children[i].kill();
    }
}

function bulletHitPlayer (character, bullet) {
    bullet.kill();
}

function render () {}
