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
	     server.on('connection', socket => this.connectSocket(socket)); //Bind 'connection' event to 'server' and call 'connectSocket' when triggered
	     
	     this.connectToPeers(); //Return websocket objects for peers passed in
	     
	     console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
	    }
	 
	 //Create and connect to peer websockets
	 connectToPeers()
	    {
	     //Create websocket objects for each 'peer' and connect
	     peers.forEach(peer => {
								const socket = new Websocket(peer); //Create peer websocket object -- socket example: "ws://localhost:5001"
								
								socket.on('open', () => this.connectSocket(socket)); //Bind 'open' event to 'socket' and call 'connectSocket' when triggered
	                           }
	                  )
	    }
	 
	 //Socket connection opened
	 connectSocket(socket)
	    {
	     this.sockets.push(socket);         //Push sockets to 'class.sockets' array
	     console.log('Socket connected');   //
	     
	     //Call message handler
	     this.messageHandler(socket);
	     
	     //Call blockchain send for socket
	     this.sendChain(socket);
	    }
	
	 //Prepare message to be sent to socket
	 messageHandler(socket)
	    {
	     //Bind 'message' event to 'socket' and call function when triggered (triggered on '.send()')
	     socket.on('message', message => {
	                                      const data = JSON.parse(message); //Parse 'message' recieved to JSON
	                                      //console.log('data', data);
	                                      
	                                      //Call 'replaceChain' to check if current chain is up to date and replace if needed
	                                      this.blockchain.replaceChain(data);
	                                     }
	              );
	    }
	 
	 //Initiate blockchain send
     sendChain(socket)
        {
         const bcString = JSON.stringify(this.blockchain.chain); //Stringify blockchain chain
         socket.send(bcString); //Send 'message' of blockchain string
        }
    
     //Peers chain update when new block addition is confirmed 
	 syncChains()
		{
		 //Send update for each peer 'socket'
		 this.sockets.forEach(socket => {
		                                 this.sendChain(socket); //Send blockchain to socket
		                                }
		                     );
		}
	}

module.exports = P2pServer; //Export class
