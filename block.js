const SHA256 = require('crypto-js/sha256');

class Block 
	{
		//Define attributes of the 'Block' class
		constructor(timestamp, lastHash, hash, data)
		{
		 this.timestamp = timestamp;
		 this.lastHash = lastHash;
		 this.hash = hash;
		 this.data = data;
		}
		
		toString()
		{
		 return `Block - \n Timestamp: ${this.timestamp}\n Last Hash: ${this.lastHash}\n Hash: ${this.hash}\n Data: ${this.data}`;
		 
		 //Return a shortened version by using '.substring()'
		 //return `Block - \n Timestamp: ${this.timestamp},\n Last Hash: ${this.lastHash.substring(0, 10)},\n Hash: ${this.hash.substring(0, 10)},\n Data: ${this.data}`;
		}
		
		//Very first block in chain
		//'static' - method that allows calling without having to make a new instance of the block class
		static genesis()
		{
		 return new this('Genesis time', 'Genesis lastHash', 'Genesis hash', 'Genesis data');
		}
		
		//BLock for mining - 
		static mineBlock(lastBlock, data)
		{
		 const timeStamp = Date.now();          //Current time
		 const lastHash = lastBlock.hash;       //Hash from previous block
		 const hash = Block.hash(timeStamp, lastHash, data);    //Hash for this block
		 
		 return new this(timeStamp, lastHash, hash, data); //Return all including 'data'
		}
		
		//Get all variables, interpolate into a string, convert to hash, and return
		static hash(timeStamp, lastHash, data)
		{
		 return SHA256(`${timeStamp}${lastHash}${data}`).toString();
		}
		
		static blockHash(block)
		{
		 //Destructure variables into 'block'
		 const {timeStamp, lastHash, data} = block;
		 
		 return Block.hash(timeStamp, lastHash, data);
		}
	}
	
module.exports = Block;
