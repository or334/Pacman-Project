const express = require('express'); // express 
const app = express(); // instantiate an express application
const server = require('http').Server(app); // create a server from the express app
const io = require('socket.io')(server); // integrate socket.io with our server
const Bundler = require('parcel-bundler'); // parcel bundler
const { CLIENT_EVENTS, SERVER_EVENTS } = require('../../shared/src/socket-events');
const bodyParser = require('body-parser'); // body-parser
const env = process.env.NODE_ENV; // figure out the environment
const port = process.env.PORT || 3000; // use environment PORT or 3000
const fs = require('fs');
/* create an api router */
const api = express.Router();
/* create a bundler and configure it */
const bundler = new Bundler('client/src/index.html', {
	outDir: 'client/dist', // where to put our bundled files
	minify: false, // reduce the size of our bundled files
	watch: env === 'development', // watch file changes only if we're in development
	sourceMaps: env === 'development'
});
app.use(bodyParser.json()); // allows json in request body
app.use('/api', api); // add the apiRouter to the '/api' route
app.use('/assets', express.static('client/assets')); // serve assets folder since parcel doesn't
app.use('/', bundler.middleware()); // serve our bundled file 

/* run the server and listen to requests */
server.listen(port, () => {
	console.log(`app is running on http://localhost:${port}`);
});
/* setup express api routes */
let nextItemId = 5;
const items = [
	{ id: 1, name: 'item 1' },
	{ id: 2, name: 'item 2' },
	{ id: 3, name: 'item 3' },
	{ id: 4, name: 'item 4' }
];
api.get('/items', (req, res) => {
	res.json(items);
});
api.get('/items/:id', (req, res) => {
	const { id } = req.params;
	const item = items.find(item => item.id == id);
	if (!item) {
		res.status(404).end();
		return;
	}
	res.json(item);
});
api.post('/items', (req, res) => {
	const { name } = req.body;
	const item = { id: nextItemId++, name };
	items.push(item);
	res.json(item);
});
api.put('/items/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const item = items.find(item => item.id == id);
	console.log(item);
	if (!item) {
		res.status(404).end();
		return;
	}
	item.name = name;
	res.json(item);
});
api.delete('/items/:id', (req, res) => {
	const { id } = req.params;
	const index = items.findIndex(item => item.id == id);
	if (index === -1) {
		res.status(404).end();
		return;
	}
	const [deleted] = items.splice(index, 1);
	res.json(deleted);
});

/* setup socket.io event handlers here */
io.on('connection', function (socket) {
	//client connected to our app setup event listeners
	console.log(`socket:${socket.id} connected`);
	
	socket.on(CLIENT_EVENTS.GREET, ({ name, message }) => {
		console.log(`CLIENT_EVENTS.GREET `);
		socket.emit(SERVER_EVENTS.GREET_BACK, { message: `Wolffffff` });
	});

	socket.on(CLIENT_EVENTS.QUESTION_SEND, () => {
		var all_question=JSON.parse(fs.readFileSync('server/src/questions.json'));
		var random_question_number = Math.floor(Math.random() * all_question["results"].length);
		console.log(random_question_number);
		var curQ = all_question["results"][random_question_number]
		console.log(curQ);
		socket.emit(SERVER_EVENTS.QUESTION_BACK, { message: curQ });
	});

	// do stuff when client disconnects
	socket.on('disconnect', () => {
		console.log(`socket:${socket.id} disconnected`);
	});
});
