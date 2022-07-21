///////////////////////////////
///////////APP INDEX///////////
///////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain'); //Calling the directory, and grabs any file called 'index' by default
const P2pServer = require('./p2p-server');  //Include p2p-server.js
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

//'process.env.HTTP_PORT' sets the port to another number when 3001 is already taken
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//Create an instance of 'express' module named 'app'
const app = express();

//Create new blockchain object named 'bc'
const bc = new Blockchain();

//Wallet instance
const wallet = new Wallet();

//TrasactionPool instance
const tp = new TransactionPool();

//Create instance of P2pServer with 'bc' blockchain and 'tp' transaction pool named as p2pServer
const p2pServer = new P2pServer(bc, tp);

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

//app GET from '/transactions' that returns all of the pool transactions in JSON format
app.get('/transactions', (req, res) => {
										res.json(tp.transactions);
									   }
	   );

//app POST from '/transact' that adds a new transaction to the pool
app.post('/transact', (req, res) => {
									 const recipient = req.body.recipient;
									 const amount = req.body.amount;
									 
									 //Create transaction based on arguments
									 const transaction = wallet.createTransaction(recipient, amount, tp);
									 
									 //Update all peers with new transaction
									 p2pServer.broadcastTransaction(transaction);
									 
									 //Call GET transactions (return transaction pool in JSON)
									 res.redirect('/transactions');
									}
	    )

//app GET wallet public key
app.get('/public-key', (req, res) => {
				                      res.json( {publicKey: wallet.publicKey} );
				                     }
	   )

//Listen server instance of 'app'
app.listen(HTTP_PORT, () => {
							 console.log(`Listening on port: ${HTTP_PORT}`);
							}
		  );

//Start websocket server
p2pServer.listen();
