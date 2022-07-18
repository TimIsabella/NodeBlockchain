//const SHA256 = require('crypto-js/sha256');
const ChainUtil = require('../chain-util');

//Destructure 'DIFFICULTY' export from 'config.js'
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block 
	{
		//Define attributes of the 'Block' class
		constructor(timeStamp, lastHash, hash, data, nonce, difficulty)
		{
		 this.timeStamp = timeStamp;
		 this.lastHash = lastHash;
		 this.hash = hash;
		 this.data = data;
		 this.nonce = nonce;
		 this.difficulty = difficulty || DIFFICULTY; //Set to 'difficulty' parameter or set to default from 'DIFFICULTY'
		}
		
		toString()
		{
		 return `Block - 
		         Timestamp : ${this.timeStamp}
		         Last Hash : ${this.lastHash}
		         Hash      : ${this.hash}
		         Nonce     : ${this.nonce}
		         Difficulty: ${this.difficulty}
		         Data      : ${this.data}`;
		 
		 //Return a shortened version by using '.substring()'
		 //return `Block - \n Timestamp: ${this.timeStamp},\n Last Hash: ${this.lastHash.substring(0, 10)},\n Hash: ${this.hash.substring(0, 10)},\n Data: ${this.data}`;
		}
		
		//Very first block in chain
		//'static' - method that allows calling without having to make a new instance of the block class
		static genesis()
		{
		 return new this('Genesis time', 'Genesis lastHash', 'Genesis hash', 'Genesis data data data', 0, DIFFICULTY);
		}
		
		//BLock for mining - 
		static mineBlock(lastBlock, data)
		{
		 let timeStamp;
		 let lastHash;
		 let hash;
		 let nonce;
		 let difficulty;
		 
		 lastHash = lastBlock.hash;           //Hash from previous block
		 nonce = 0;                           //Nonce value
		 difficulty = lastBlock.difficulty;   //Set 'difficulty' to 'lastBlock' difficulty
		 
		 /*
		 //Perform loop to find hash starting with zeros up to 'DIFFICULTY' value until match
		 while(true)      
			  {
			   nonce++;
			   timeStamp = Date.now();                                 //Current time
			   hash = Block.hash(timeStamp, lastHash, data, nonce);    //Hash for this block
			   
			   if(hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY)) break;
		      }
		 */
		 
		 //Perform loop to find hash starting with zeros up to 'DIFFICULTY' value until match (same as above but faster)
		 do{                                     
		    nonce++;
		    timeStamp = Date.now();                                          //Current timestamp
		    difficulty = Block.adjustDifficulty(lastBlock, timeStamp);       //Adjusted difficulty level based on block completion timestamps
		    hash = Block.hash(timeStamp, lastHash, data, nonce, difficulty); //Hash for this block
		   }
		 while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
		
		 return new this(timeStamp, lastHash, hash, data, nonce, difficulty); //Return all
		}
		
		//Get all variables, interpolate into a string, convert to hash, and return
		static hash(timeStamp, lastHash, data, nonce, difficulty)
		{
		 //return SHA256(`${timeStamp}${lastHash}${data}${nonce}${difficulty}`).toString();
		 return ChainUtil.hash(`${timeStamp}${lastHash}${data}${nonce}${difficulty}`).toString();
		}
		
		static blockHash(block)
		{
		 //Destructure variables into 'block'
		 const {timeStamp, lastHash, data, nonce, difficulty} = block;
		 
		 return Block.hash(timeStamp, lastHash, data, nonce, difficulty);
		}
		
		//Adjust the block difficulty by comparing timestamps of previous and current block completion
		static adjustDifficulty(lastBlock, currentTime)
		{
		 let difficulty = lastBlock.difficulty;
		 
		 //Adjust difficulty by comparing 'lastBlock' timestamp plus 'MINE_RATE' miliseconds to current time
		 // - Increase difficulty if greater than
		 // - Lower difficulty if lower than
		 difficulty = lastBlock.timeStamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
		 
		 return difficulty;
		}
	}
	
module.exports = Block;
