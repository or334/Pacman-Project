import Phaser from 'phaser';
import { SCENES, CONFIG, SPRITES, TILESETS, TILEMAPS } from '../constants';

export class BootScene extends Phaser.Scene {

	constructor() {
		super({ key: SCENES.BOOT });
	}

	preload() {
		this.loadingText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 50, 'Loading...', { font: '20px monospace', fill: '#ffffff' });
		this.loadingText.setOrigin(0.5, 0.5);
		this.percentText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, '0%', { font: '18px monospace', fill: '#ffffff' });
		this.percentText.setOrigin(0.5, 0.5);
		this.load.on('progress', (value) => {
			this.percentText.setText(parseInt(value * 100) + '%');
		});
		this.load.spritesheet(SPRITES.PACMAN, '/assets/sprites/pacman.png', { frameHeight: 32, frameWidth: 32 });
		this.load.spritesheet(SPRITES.GHOST, '/assets/sprites/all_ghosts.png', { frameHeight: 32, frameWidth: 32 });
		this.load.spritesheet(SPRITES.DOT, '/assets/tilesets/dot.png', { frameHeight: 32, frameWidth: 32 });
		this.load.spritesheet(SPRITES.CANDY, '/assets/tilesets/candy.jpeg', { frameHeight: 32, frameWidth: 32 });
		this.load.image(TILESETS.TILESMAP, '/assets/tilesets/tiles.png');
		this.load.tilemapTiledJSON(TILEMAPS.LEVEL, '/assets/tilemaps/level.json');
		this.load.json('q_data', '/assets/questions.json');
	}
	create() {
		this.scene.start(SCENES.GAME);
	}
}