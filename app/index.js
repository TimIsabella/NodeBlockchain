///////////////////////////////
///////////APP INDEX///////////
///////////////////////////////

const express = require('express');
const Blockchain = require('../blockchain'); //Calling the directory, and grabs any file called 'index' by default

//'process.env.HTTP_PORT' sets the port to another number when 3001 is already taken
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//Create 'express' module named 'app'
const app = express();

//Create new blockchain object named 'bc'
const bc = new Blockchain();

//Instance of 'app' with '.get()' that returns a response of 'bc.chain' in JSON format
app.get('/blocks', (req, res) => {
								  res.json(bc.chain);
								 }
	   );

//Listen server instance of 'app'
app.listen(HTTP_PORT, () => {
							 console.log(`Listening on port: ${HTTP_PORT}`);
							}
		  );
