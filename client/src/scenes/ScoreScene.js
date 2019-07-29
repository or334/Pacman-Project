import Phaser from 'phaser';
import { SCENES, CONFIG, SPRITES, TILESETS, TILEMAPS } from '../constants';


export class ScoreScene extends Phaser.Scene {

	constructor() {
		super({ key: 'SCORE_SCENE' });
	}
	init(scores) {
		this.scores = scores;
	}
	preload() {
		this.load.image('sky', '../../assets/tilesets/gameover_bg.jpg');
	}
	create() {
		this.add.image(0, 0, 'sky').setOrigin(0,0);
		this.scores += '\n\n Press SPACE to continue'
		this.scoreText = this.add.text( 680	, 250, this.scores, { font: '25px monospace', fill: '#ffffff' });
		this.scoreText.setOrigin(0.5, 0.5);
		this.add.existing(this.scoreText);
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	}
	
	update() {
		if (Phaser.Input.Keyboard.JustDown(this.spacebar))
		{
			this.scene.start(SCENES.GAME);
		}
	}
}