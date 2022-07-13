const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 4;

class Block 
	{
		//Define attributes of the 'Block' class
		constructor(timeStamp, lastHash, hash, data, nonce)
		{
		 this.timeStamp = timeStamp;
		 this.lastHash = lastHash;
		 this.hash = hash;
		 this.data = data;
		 this.nonce = nonce;
		}
		
		toString()
		{
		 return `Block - 
		         Timestamp: ${this.timestamp}
		         Last Hash: ${this.lastHash}
		         Hash     : ${this.hash}
		         Nonce    : ${this.nonce}
		         Data     : ${this.data}`;
		 
		 //Return a shortened version by using '.substring()'
		 //return `Block - \n Timestamp: ${this.timestamp},\n Last Hash: ${this.lastHash.substring(0, 10)},\n Hash: ${this.hash.substring(0, 10)},\n Data: ${this.data}`;
		}
		
		//Very first block in chain
		//'static' - method that allows calling without having to make a new instance of the block class
		static genesis()
		{
		 return new this('Genesis time', 'Genesis lastHash', 'Genesis hash', 'Genesis data', 0);
		}
		
		//BLock for mining - 
		static mineBlock(lastBlock, data)
		{
		 let hash;
		 let timeStamp;
		 
		 const lastHash = lastBlock.hash;  //Hash from previous block
		 let nonce = 0;                    //Nonce value
		 
		 //Perform loop of hash with zeros up to 'DIFFICULTY' value until match
		 while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))      
			  {
			   timeStamp = Date.now();                                 //Current time
			   hash = Block.hash(timeStamp, lastHash, data, nonce);    //Hash for this block
			   
			   nonce++;
		      }
		 
		 /*
		 do{                                     
		    nonce++;
		    timeStamp = Date.now();                                 //Current time
		    hash = Block.hash(timeStamp, lastHash, data, nonce);    //Hash for this block
		   } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
		 */   
		
		 return new this(timeStamp, lastHash, hash, data, nonce); //Return all including 'data'
		}
		
		//Get all variables, interpolate into a string, convert to hash, and return
		static hash(timeStamp, lastHash, data, nonce)
		{
		 return SHA256(`${timeStamp}${lastHash}${data}${nonce}`).toString();
		}
		
		static blockHash(block)
		{
		 //Destructure variables into 'block'
		 const {timeStamp, lastHash, data, nonce} = block;
		 
		 return Block.hash(timeStamp, lastHash, data, nonce);
		}
	}
	
module.exports = Block;
