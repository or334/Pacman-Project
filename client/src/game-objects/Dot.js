import Phaser from 'phaser';
import { SPRITES, ANIMATIONS, DIRECTIONS } from '../constants';


export class Dot extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SPRITES.DOT, 3);
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);
		this.body.setVelocity(0, 0);
		Dot.Count++;
	}
	TouchPacman(pacman) {
		this.destroy();
	}
}
Dot.Count = 0;