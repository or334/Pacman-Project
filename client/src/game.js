import Phaser from 'phaser';
import { CONFIG } from './constants';
import { socket } from './socket';
import { CLIENT_EVENTS, SERVER_EVENTS } from '../../shared/src/socket-events';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { ScoreScene } from './scenes/ScoreScene';

socket.on('connect', () => {
	socket.emit(CLIENT_EVENTS.QUESTION_SEND, { message: 'Q from client', name: 'Dor' });
	socket.emit(CLIENT_EVENTS.GREET, { message: 'Valar morghulis', name: 'John' });
	
});
socket.on(SERVER_EVENTS.GREET_BACK, ({ message }) => {
	console.warn(message);
	
});

socket.on(SERVER_EVENTS.QUESTION_BACK, ({ message }) => {
	console.warn(message);
});

new Phaser.Game({
	socket: socket,
	type: Phaser.CANVAS,
	width: CONFIG.WIDTH,
	height: CONFIG.HEIGHT,
	parent: 'body',
	backgroundColor: '#bbb',
	scene: [BootScene, GameScene, ScoreScene],
	dom: { createContainer: true },
	physics: {
		default: 'arcade',
		arcade: {}
	}
});
