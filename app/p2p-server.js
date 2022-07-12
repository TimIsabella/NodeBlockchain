const Websocket = require('ws');

//const P2P_PORT = 5001;
const P2P_PORT = process.env.P2P_PORT || 5001; //use port from process environment or default to 5001

//Web Socket Address example: 'ws.//localhost:5001'
//'PEERS' environment variable array example: ['ws.//localhost:5001', 'ws.//localhost:5002', 'ws.//localhost:5003']
//Video example: "$ HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost5002 npm run dev"
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; //use '.PEERS' of process environment if it contains data and parse by comma, otherwise return empty array

//Create the P2P server
class P2pServer
	{
	 constructor(blockchain)
	            {
	             this.blockchain = blockchain; //class.blockchain = blockchain input
	             this.sockets = [];            //class.sockets = empty array
	            }
	 
	 //Create listen server
	 listen()
	    {
	     const server = new Websocket.Server({port: P2P_PORT}); //Create a server instance using 'Websocket module' called 'server' running on port 'P2P_PORT'
	     server.on('connection', socket => this.connectSocket(socket)); //Set '.on()' event on 'server' for 'connection', and call '.connectSocket' when event is triggered
	     
	     this.connectToPeers(); //Return websocket objects for peers passed in
	     
	     console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
	    }
	 
	 //Create and connect to peer websockets
	 connectToPeers()
	    {
	     //Create websocket objects for each 'peer' and connect
	     peers.forEach(peer => {
								const socket = new Websocket(peer); //Create peer websocket object -- socket example: "ws://localhost:5001"
								
								socket.on('open', () => this.connectSocket(socket)); //'open' websocket of 'socket' and call 'connectSocket()'
	                           }
	                  )
	    }
	 
	 //Push socket to class and log connected
	 connectSocket(socket)
	    {
	     this.sockets.push(socket);         //Push sockets to 'class.sockets' array
	     console.log('Socket connected');
	    }
	}

module.exports = P2pServer; //Export class
