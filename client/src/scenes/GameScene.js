// Idan Hackmon, Evyatar Hai, Dor Levi, Or Aharon
// Pacman project June 2019
// All rights reserved

// Imports
import Phaser from 'phaser';
import { SCENES, TILEMAPS, CONFIG, TILESETS } from '../constants';
import { Pacman } from '../game-objects/Pacman';
import { Ghost } from '../game-objects/Ghost';
import { Dot } from '../game-objects/Dot';
import { Candy } from '../game-objects/Candy';
import io from 'socket.io-client';
import { resolve } from 'path';
export const socket = io.connect();
export class GameScene extends Phaser.Scene {
	// GameScene class
	constructor() {
		super({ key: SCENES.GAME });

		// Is player 2 playing
		this.player_two_joined = true;
	}
	init() {
		this.curQuestion="---";

		socket.on('SERVER_QUESTION', ({ message }) => {
			this.curQuestion=message;
		});
	}
	
	preload() {
		// The edible dots position
		this.edible_dots = [[48, 80], [48, 112], [48, 144], [48, 176], [48, 208], [48, 240], [48, 272],[368, 112], [48, 336], [48, 368], [48, 400], [48, 432], [48, 464], [48, 496], [48, 528], [48, 560], [48, 592], [80, 48], [80, 272], [80, 336], [80, 592], [112, 48], [112, 80], [112, 112], [112, 144], [112, 176], [112, 208], [112, 272], [112, 336], [112, 400], [112, 432], [112, 464], [112, 496], [112, 528], [112, 560], [112, 592], [144, 48], [144, 80], [144, 112], [144, 272], [144, 336], [144, 400], [144, 464], [176, 48], [176, 80], [176, 112], [176, 272], [176, 336], [176, 400], [176, 464], [176, 496], [176, 528], [176, 560], [176, 592], [208, 48], [208, 80], [208, 112], [208, 272], [208, 336], [208, 400], [208, 464], [208, 528], [240, 48], [240, 80], [240, 112], [240, 144], [240, 176], [240, 208], [240, 272], [240, 336], [240, 400], [240, 464], [240, 528], [240, 592], [272, 48], [272, 272], [272, 336], [272, 400], [272, 464], [272, 528], [272, 592], [304, 48], [304, 80], [304, 112], [304, 144], [304, 176], [304, 208], [304, 240], [304, 272], [304, 336], [304, 400], [304, 528], [304, 592], [336, 48], [336, 272], [336, 304], [336, 336], [336, 400], [336, 432], [336, 496], [336, 528], [336, 592], [368, 48], [368, 80], [368, 144], [368, 176], [368, 208], [368, 272], [368, 432], [368, 496], [368, 592], [400, 48], [400, 208], [400, 272], [400, 336], [400, 368], [400, 432], [400, 496], [400, 528], [400, 560], [400, 592], [432, 48], [432, 112], [432, 176], [432, 208], [432, 272], [432, 304], [432, 336], [432, 368], [432, 432], [432, 496], [464, 48], [464, 112], [464, 144], [464, 176], [464, 272], [464, 336], [464, 368], [464, 432], [464, 496], [464, 528], [464, 560], [464, 592], [496, 48], [496, 272], [496, 432], [496, 496], [496, 592], [528, 48], [528, 80], [528, 112], [528, 144], [528, 176], [528, 208], [528, 240], [528, 272], [528, 304], [528, 336], [528, 368], [528, 400], [528, 432], [528, 496], [528, 528], [528, 592], [560, 48], [560, 272], [560, 496], [560, 528], [560, 592], [592, 48], [592, 80], [592, 112], [592, 144], [592, 176], [592, 208], [592, 272], [592, 336], [592, 368], [592, 400], [592, 432], [592, 464], [592, 496], [592, 528], [592, 560], [592, 592], [624, 48], [624, 80], [624, 112], [624, 144], [624, 176], [624, 208], [624, 272], [624, 336], [624, 400], [624, 592], [656, 48], [656, 80], [656, 112], [656, 144], [656, 176], [656, 208], [656, 272], [656, 336], [656, 400], [656, 432], [656, 464], [656, 496], [656, 528], [656, 592], [688, 48], [688, 80], [688, 112], [688, 144], [688, 176], [688, 208], [688, 240], [688, 272], [688, 528], [688, 592], [720, 48], [720, 272], [720, 304], [720, 336], [720, 368], [720, 400], [720, 432], [720, 464], [720, 496], [720, 528], [720, 592], [752, 48], [752, 112], [752, 176], [752, 208], [752, 240], [752, 272], [752, 336], [752, 592], [784, 48], [784, 112], [784, 176], [784, 208], [784, 240], [784, 272], [784, 336], [784, 368], [784, 400], [784, 432], [784, 464], [784, 496], [784, 528], [784, 560], [784, 592], [816, 48], [816, 112], [816, 176], [816, 208], [816, 240], [816, 272], [816, 304], [816, 336], [848, 48], [848, 112], [848, 144], [848, 176], [848, 208], [848, 240], [848, 272], [848, 336], [848, 368], [848, 400], [848, 432], [848, 464], [848, 496], [848, 528], [848, 560], [848, 592]]
		this.dots_count = this.edible_dots.length;
		// The question JSON file
		this.load.json('question_data', '../../assets/questions.json');
		this.load.audio('pacman_death', '../../assets/audio/pacman_death.wav');
		this.load.audio('pacman_chomp', '../../assets/audio/pacman_chomp.wav');
		this.load.audio('pacman_beginning', '../../assets/audio/pacman_beginning.wav');
		this.load.audio('pacman_eatfruit', '../../assets/audio/pacman_eatfruit.wav');
		this.load.audio('pacman_eatghost', '../../assets/audio/pacman_eatghost.wav');
	}
	create() {
		this.sound.add('pacman_death');
		this.sound.add('pacman_chomp');
		this.sound.add('pacman_beginning');
		this.sound.add('pacman_eatfruit');
		this.sound.add('pacman_eatghost');

		this.sound.play('pacman_beginning');
		// If true then ghost will be edible and a question will appear
		this.question_mode = false;
		// The JSON object for questions
		this.question_data = this.cache.json.get('question_data');
		this.curQuestion=this.question_data["results"][1];

		// Initial map settings
		this.level = this.add.tilemap(TILEMAPS.LEVEL, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE, CONFIG.WIDTH_TILES, CONFIG.HEIGHT_TILES);
		this.levelTileset = this.level.addTilesetImage('tiles', TILESETS.TILESMAP);
		this.backgroundLayer = this.level.createStaticLayer('background', this.levelTileset);
		this.wallsLayer = this.level.createStaticLayer('walls', this.levelTileset);
		this.wallsLayer.setCollisionByProperty({ wall: true });

		// Add players to player list
		this.players = [
			new Pacman(this, this.input.keyboard.addKeys({ up: 'UP', down: 'DOWN', right: 'RIGHT', left: 'LEFT' }), 0)
		];
		if(this.player_two_joined) {
			this.players.push(new Pacman(this, this.input.keyboard.addKeys({ up: 'W', down: 'S', right: 'D', left: 'A' }), 1));
		}
		this.players_score = ['', ''];

		// Creating all dots on screen
		this.dots = [];
		for (var i = 0; i < this.edible_dots.length; i++) {
			this.dots.push(new Dot(this, this.edible_dots[i][0], this.edible_dots[i][1]));
		}
		// The question text
		this.QuestionText = this.add.text( 920, 100, '', { font: '16px monospace', fill: '#000000' });
		this.add.existing(this.QuestionText);

		// Add question candy
		this.candies = [new Candy(this, 848, 550), new Candy(this, 48, 480), new Candy(this, 48, 112), new Candy(this, 240, 592)];
		// Add ghosts
		this.ghosts = [new Ghost(this, 0), new Ghost(this, 1), new Ghost(this, 2), new Ghost(this, 3)];
		// Pacman and wall collider
		this.physics.add.collider([...this.players, ...this.ghosts], this.wallsLayer);

		// Check for candies and player collision
		this.physics.add.overlap(this.candies, this.players, (g, p) => {
			if (Math.abs(p.body.overlapX) > 5 || Math.abs(p.body.overlapY) > 5) {
				g.TouchPacman(p);
				this.sound.play('pacman_eatfruit');
				this.question_mode = true;
				this.QuestionText.setText(this.get_question());
				for (var i = 0; i < this.ghosts.length; i++) {
					this.ghosts[i].question_mode = true;
				}
			}
		});

		// Checks if dots are touching the player
		this.physics.add.overlap(this.dots, this.players, (g, p) => {
			if (Math.abs(p.body.overlapX) > 3 || Math.abs(p.body.overlapY) > 3) {
				g.TouchPacman(p);
				p.TouchDot();
				this.dots_count--;
				this.sound.play('pacman_chomp');
			}
		});

		// Handle ghost and player collision
		this.physics.add.overlap(this.ghosts, this.players, (g, p) => {
			if (Math.abs(p.body.overlapX) > 3 || Math.abs(p.body.overlapY) > 3) {
				if(!this.question_mode) {  // Regular collision
					this.sound.play('pacman_death');
					p.TouchGhost();
					g.TouchPacman();
					if(p.lives == 0) {
						// Remove pacman from players list
						this.players.splice(this.players.indexOf(p), 1 );
						p.destroy();
					}
				} else {  // Case of collision in question mode
					g.TouchPacman();
					this.sound.play('pacman_eatghost');
					for (var i = 0; i < this.ghosts.length; i++) {
						this.ghosts[i].alpha = 1;
						this.ghosts[i].question_mode = false;
					}
					if(this.answer_index == g.ghost_number) {
						p.points += this.question_worth;
						this.QuestionText.setText('Correct answer!');
					} else {
						this.QuestionText.setText('Wrong answer!');
					}
					this.question_mode = false;
				}
			}
		});
	}
	update() {
		this.physics.world.wrap([...this.players, ...this.ghosts], CONFIG.FRAME_SIZE / 2);
		this.players.forEach(p => p.move(this.wallsLayer));
		this.ghosts.forEach(g => g.move(this.wallsLayer));

		// Wait for a player to die
		this.game_on = false;
		for (var i = 0; i < this.players.length; i++) {
			if(this.players[i].lives>0)
			{
				this.players_score[this.players[i].player] = ('Player ' + (this.players[i].player + 1).toString() + ' Points: ' + (this.players[i].points + 1).toString() + '\n');
				this.game_on = true;
			}
		}
		if(!this.game_on || this.dots_count == 0) {
			this.scene.start('SCORE_SCENE', this.players_score);
		}

		// Make ghosts flash
		if(this.question_mode) {
			for (var i = 0; i < this.ghosts.length; i++) {
				this.ghosts[i].alpha = 1.5 - this.ghosts[i].alpha;
			}
		}
	}
	
	get_question() {
		// Function to get question from JSON file
		socket.emit('CLIENT_QUESTION', { message: 'Q from client', name: 'Dor' });
		console.log(this.curQuestion);
		var q = this.curQuestion;
		//var random_question_number = Math.floor(Math.random() * this.question_data["results"].length);
		var question = q["question"];
		var answers = q["incorrect_answers"];
		this.answer_index = Math.floor(Math.random() * 4);
		this.question_worth = 0;
		if(q["difficulty"] == "easy")
			this.question_worth = 100;
		else if(q["difficulty"] == "medium")
			this.question_worth = 200;
		else
			this.question_worth = 400;
		answers.splice(this.answer_index, 0, q["correct_answer"]);
		var msg = ''
		while(question.length > 40) {
			msg += question.slice(0, 40) + '\n';
			question = question.slice(40);
		}
		msg += question + "\n\n";
		msg += 'Blue: ' + answers[0] + "\n";
		msg += 'Red: ' + answers[1] + "\n";
		msg += 'White: ' + answers[2] + "\n";
		msg += 'Orange: ' + answers[3];
		return msg;
	}

}/*
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));	
}
	async function demo() {
		await sleep(3000);
}*/