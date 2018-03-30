//jshint esversion: 6

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 100) + 200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, x) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //if enemy goes off canvas reset x-axis back -100
    if (this.x > 500) {
        this.x = -35;
    }

    //Check for collision of player with enemies  
    if (player.x < this.x + 60 && player.x + 40 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    //no change needed, same speed
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {
    if (keyInput === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (keyInput === 'right' && this.x < 400) {
        this.x = this.x + 100;
    } else if (keyInput === 'up' && this.y > -10) {
        this.y = this.y - 90;
        if (this.y === -50) {
            this.y = 400;
        }
    } else if (keyInput === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player(200, 400);
//Instantiate enemies and place them in an array called allEnemies
var allEnemies = [];
//Place enemies in 3 locations on map
var enemies = [60, 145, 225];
enemies.map(y => allEnemies.push(new Enemy(0, y)));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});