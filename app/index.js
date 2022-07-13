///////////////////////////////
///////////APP INDEX///////////
///////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain'); //Calling the directory, and grabs any file called 'index' by default
const P2pServer = require('./p2p-server');  //Include p2p-server.js

//'process.env.HTTP_PORT' sets the port to another number when 3001 is already taken
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//Create an instance of 'express' module named 'app'
const app = express();

//Create new blockchain object named 'bc'
const bc = new Blockchain();

//Create instance of P2pServer with 'bc' blockchain named as p2pServer
const p2pServer = new P2pServer(bc);

//Mount 'bodyParser' functions onto 'app' with '.use()'
app.use(bodyParser.json());

//app GET from '/blocks' that returns a response of 'bc.chain' in JSON format
app.get('/blocks', (req, res) => {
								  res.json(bc.chain);
								 }
	   );

//app POST to '/mine'
app.post('/mine', (req, res) => {
								 //Call '.addBlock()' method for 'bc' with the request body data and add it to 'block'
								 const block = bc.addBlock(req.body.data);
								 console.log(`New block aded: ${block.toString()}`);
								 
								 //Initiate chain synchronization for all peers
								 p2pServer.syncChains();
								 
								 //Respond to client with current block
								 res.redirect('/blocks');
								}
		);

//Listen server instance of 'app'
app.listen(HTTP_PORT, () => {
							 console.log(`Listening on port: ${HTTP_PORT}`);
							}
		  );

//Start websocket server
p2pServer.listen();
