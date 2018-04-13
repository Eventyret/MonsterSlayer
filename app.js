new Vue({
	el: "#app",
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		gameLog: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
		},
		attack: function() {
			let damage = this.calculateDamage(3,10);
			this.monsterHealth -= damage;
			this.gameLog.unshift({
				isPlayer: true,
				text: 'You hit the monster for' + damage
			});
			if (this.checkWinner()) { 
				return;
			}
			
			this.monsterAttacks();
		},
		specialAttack: function() {
			this.monsterHealth -= this.calculateDamage(10, 20);
			if(this.checkWinner()) {
				return
			}
			this.monsterAttacks()
		},
		heal: function() {
			if(this.playerHealth <= 90) {
				this.playerHealth +=10;
			} else {
				this.playerHealth = 100;
			}
			this.monsterAttacks();
		},
		giveUp: function(){
			this.gameIsRunning = false;
			this.playerHealth = "Dead"			
		},
		monsterAttacks: function() {
			let damage = this.calculateDamage(5, 12);
			this.playerHealth -= damage;
			this.checkWinner();
			this.gameLog.unshift({
				isPlayer: false,
				text: 'The Monster hits you for' + damage
			});
		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min)
		},
		checkWinner() {
			if (this.monsterHealth <= 0) {
				if(confirm("You Win - Fatality. New Game?")) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if(confirm("You Loose! New Game?")) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
	}
})