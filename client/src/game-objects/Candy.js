import Phaser from 'phaser';
import { SPRITES, ANIMATIONS, DIRECTIONS } from '../constants';

export class Candy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SPRITES.CANDY, 3);
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		Candy.Count++;
	}
	TouchPacman(pacman) {
		this.destroy();
	}
}
Candy.Count = 0;