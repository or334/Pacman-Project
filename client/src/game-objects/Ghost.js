import Phaser from 'phaser';
import { SPRITES, ANIMATIONS, DIRECTIONS } from '../constants';
export class Ghost extends Phaser.GameObjects.Sprite {
	constructor(scene, ghost_number) {
		super(scene, 32 * 13 + 16, 32 * 11 + 16, SPRITES.GHOST);
		this.ghost_number = ghost_number;
		this.scene.add.existing(this); // add our sprite to the scene
		this.scene.physics.world.enable(this); // add physics to our sprite	
		this.createAnimations();
		this.turning = false;
		this.question_mode = false;
	}
	/**
	 * moves the ghost according to the walls layer
	 * @param {Phaser.Tilemaps.StaticTilemapLayer} walls 
	 */

	TouchPacman() {
		this.x = 32 * 13 + 16;
		this.y = 32 * 11 + 16;
	}

	move(walls) {
		// get the current tile the ghost is walking on 
		const current = walls.getTileAtWorldXY(this.x, this.y, true);
		// if current is null we are crossing the screen
		if (current == null) {
			return;
		}
		// get the neighbors (null if none)
		const neighbors = [
			{ tile: walls.getTileAt(current.x, current.y - 1), direction: DIRECTIONS.UP },
			{ tile: walls.getTileAt(current.x, current.y + 1), direction: DIRECTIONS.DOWN },
			{ tile: walls.getTileAt(current.x + 1, current.y), direction: DIRECTIONS.RIGHT },
			{ tile: walls.getTileAt(current.x - 1, current.y), direction: DIRECTIONS.LEFT }
		];
		// do nothing if we moved allready and we don't meet the threshold for turning 
		if (!Phaser.Math.Fuzzy.Equal(current.getCenterX(), this.x, 2) || !Phaser.Math.Fuzzy.Equal(current.getCenterY(), this.y, 2)) {
			return;
		}

		// get the available directions except behind us
		const available = neighbors
			.filter(x => x.tile == null)
			.filter(({ direction }) => direction == this.direction || (direction + 180) % 180 != (this.direction + 180) % 180);
		if (available.length == 0) {
			this.direction = direction+180;
			return;
		}
		// take one direction at random
		const { direction } = Phaser.Math.RND.pick(available);

		if (this.question_mode) {
			if(this.body.velocity.x > 1)
				this.body.velocity.x = 50;
			else if(this.body.velocity.x < -1)
				this.body.velocity.x = -50;

			if(this.body.velocity.y > 1)
				this.body.velocity.y = 50;
			else if(this.body.velocity.y < -1)
				this.body.velocity.y = -50;
		} else {
			if(this.body.velocity.x > 1)
				this.body.velocity.x = 120;
			else if(this.body.velocity.x < -1)
				this.body.velocity.x = -120;

			if(this.body.velocity.y > 1)
				this.body.velocity.y = 120;
			else if(this.body.velocity.y < -1)
				this.body.velocity.y = -120;
		}

		// check if the ghos is turning allready
		if (!this.turning) {
			//if not then check if we need to change the animation / velocity 
			if (this.direction != direction) {
				this.body.reset(current.getCenterX(), current.getCenterY());
				this.scene.physics.velocityFromAngle(direction + 180, 120, this.body.velocity);
				this.anims.play(`${ANIMATIONS.GHOST}_${direction}`+(this.ghost_number).toString());
				this.direction = direction;
			}
			//indicate that the ghost is turning and toggle it back after 1/5 of second
			this.turning = true;
			setTimeout(() => {
				this.turning = false;
			}, 200);
		}
	}



	createAnimations() {
		this.scene.anims.create({
			key: `${ANIMATIONS.GHOST}_${DIRECTIONS.DOWN}`+(this.ghost_number).toString(),
			frames: this.scene.anims.generateFrameNumbers(SPRITES.GHOST, { frames: [0+this.ghost_number*8, 1+this.ghost_number*8] }),
			frameRate: 4,
			yoyo: false,
			repeat: -1,
		});
		this.scene.anims.create({
			key: `${ANIMATIONS.GHOST}_${DIRECTIONS.UP}`+(this.ghost_number).toString(),
			frames: this.scene.anims.generateFrameNumbers(SPRITES.GHOST, { frames: [2+this.ghost_number*8, 3+this.ghost_number*8] }),
			frameRate: 4,
			yoyo: false,
			repeat: -1,
		});
		this.scene.anims.create({
			key: `${ANIMATIONS.GHOST}_${DIRECTIONS.LEFT}`+(this.ghost_number).toString(),
			frames: this.scene.anims.generateFrameNumbers(SPRITES.GHOST, { frames: [4+this.ghost_number*8, 5+this.ghost_number*8] }),
			frameRate: 4,
			yoyo: false,
			repeat: -1,
		});
		this.scene.anims.create({
			key: `${ANIMATIONS.GHOST}_${DIRECTIONS.RIGHT}`+(this.ghost_number).toString(),
			frames: this.scene.anims.generateFrameNumbers(SPRITES.GHOST, { frames: [6+this.ghost_number*8, 7+this.ghost_number*8] }),
			frameRate: 4,
			yoyo: false,
			repeat: -1,
		});
	}
}