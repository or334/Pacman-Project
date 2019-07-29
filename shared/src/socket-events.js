/* Server and client socket.io event constants*/
module.exports = {
	CLIENT_EVENTS: {
		QUESTION_SEND: 'CLIENT_QUESTION',
		GREET: 'CLIENT_GREET'
	},
	SERVER_EVENTS: {
		QUESTION_BACK: 'SERVER_QUESTION',
		GREET_BACK: 'SERVER_GREET_BACK'
	}
};