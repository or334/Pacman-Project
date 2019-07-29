import Phaser from 'phaser';
import { SPRITES, ANIMATIONS, DIRECTIONS } from '../constants';

export class Pacman extends Phaser.GameObjects.Sprite {
	constructor(scene, inputs, player, x = 48, y = 48) {
		super(scene, x, y, SPRITES.PACMAN, 3);
		this.scene.add.existing(this); // add our sprite to the scene
		this.scene.physics.world.enable(this); // add physics to our sprite
		this.index = Pacman.Count++;
		this.lives = 3;
		this.points = 0;
		this.player = player;
		this.inputs = inputs;
		this.body.setVelocity(0, 0);
		this.animation = scene.anims.create({
			key: `${ANIMATIONS.PACMAN}_${Pacman.Count}` + this.player.toString() + (this.player).toString(),
			frames: scene.anims.generateFrameNumbers(SPRITES.PACMAN, { frames: [0+this.player*3, 1+this.player*3,
																				2+this.player*3, 1+this.player*3] }),
			frameRate: 12,
			yoyo: false,
			repeat: -1,
		});
		if(this.player == 1) {
			this.text_x = 1080;
			this.text_y = 50;
		} else {
			this.text_x = 1080;
			this.text_y = 20;
		}
		this.livesText = this.scene.add.text( this.text_x, this.text_y, 'Player ' + (this.player+1).toString() +' lives: ' + this.lives + ' | Points: ' + this.points, { font: '20px monospace', fill: '#000000' });
		this.livesText.setOrigin(0.5, 0.5);
		this.scene.add.existing(this.livesText);

		this.anims.play(this.animation);

	}
	TouchDot() {
		this.points++;
		this.livesText.setText( 'Player ' + this.player.toString() +' lives: ' + this.lives + ' | Points: ' + this.points);
	}
	TouchGhost() {
		this.lives--;
		this.x = 48;
		this.y = 48;
		this.livesText.setText( 'Player ' + this.player.toString() +' lives: ' + this.lives + ' | Points: ' + this.points);
	}

	move(walls) {
		// get the current tiles and its neighbors ( true means it will return an empty tile instead of null)
		const current = walls.getTileAtWorldXY(this.x, this.y, true);
		// if there's no current tile ( which means we are moving through the screen) dont do anything
		if (!current) {
			return;
		}
		// get the neighbor tiles
		const { up, down, right, left } = this.inputs;
		const neighbors = {
			[DIRECTIONS.UP]: walls.getTileAt(current.x, current.y - 1),
			[DIRECTIONS.DOWN]: walls.getTileAt(current.x, current.y + 1),
			[DIRECTIONS.RIGHT]: walls.getTileAt(current.x + 1, current.y),
			[DIRECTIONS.LEFT]: walls.getTileAt(current.x - 1, current.y)
		};

		// check if a key is down and the tile in that direction is not a wall
		if (up.isDown && neighbors[DIRECTIONS.UP] == null) {
			this.turn(DIRECTIONS.UP, current, neighbors.up);
			this.animation.resume();

		}
		else if (down.isDown && neighbors[DIRECTIONS.DOWN] == null) {
			this.turn(DIRECTIONS.DOWN, current, neighbors.down);
			this.animation.resume();
		}
		else if (left.isDown && neighbors[DIRECTIONS.LEFT] == null) {
			this.turn(DIRECTIONS.LEFT, current, neighbors.left);
			this.animation.resume();
		}
		else if (right.isDown && neighbors[DIRECTIONS.RIGHT] == null) {
			this.turn(DIRECTIONS.RIGHT, current, neighbors.right);
			this.animation.resume();
		}

		// if we try to move forward and there's a wall in front stop stop the animation
		if (this.body.onFloor() || this.body.onCeiling() || this.body.onWall()) {
			this.animation.pause();
		}
		this.scene.physics.velocityFromAngle(this.angle, -128, this.body.velocity);
	}

	/**
	 * Turns pacman to the given direction
	 * @param {Number} direction  The angle direction we want to turn
	 * @param {Phaser.Tilemaps.Tile} current The current Tile we are on 
	 * @param {Phaser.Tilemaps.Tile} neighbor The Tile we are going to turn to
	 */
	turn(direction, current, neighbor) {
		// if we are moving towards the same direction or if there's a neighbor wall we can't turn 
		if (this.angle == direction || neighbor) {
			return;
		}

		// if we are turning to the opposite direction we can turn
		if (Phaser.Math.Angle.WrapDegrees(direction + 180) == this.angle) {
			this.setAngle(direction);
			return;
		}
		// if we're not close enough to the turning point don't turn
		if (!Phaser.Math.Fuzzy.Equal(this.y, current.getCenterY(), 2) || !Phaser.Math.Fuzzy.Equal(this.x, current.getCenterX(), 2)) {
			return;
		}
		// position pacman perfectly on the turn point
		this.body.stop();
		this.setPosition(current.getCenterX(), current.getCenterY());
		this.body.prev.copy(this.body.position); // 
		this.setAngle(direction);
		return true;
	}



}
Pacman.Count = 0;


