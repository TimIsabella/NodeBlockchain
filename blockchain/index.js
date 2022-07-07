//////////////////////////////////////
///////////BLOCKCHAIN INDEX///////////
//////////////////////////////////////

const Block = require('./block');

class Blockchain 
	{
	 constructor()
	    {
	     this.chain = [Block.genesis()];
	    }
	 
	 addBlock(data)
	    {
	     /*
	     //Get previous block from 'this.chain' by getting the last block -1
	     const lastBlock = this.chain[this.chain.length-1];
	     
	     //Create block using '.mineBlock()' method by combining 'lastBlock' from above and the 'data' input from 'addBlock'
	     const block = Block.mineBlock(lastBlock, data);
	     */
	     
	     //Same as above but condensed
	     const block = Block.mineBlock(this.chain[this.chain.length-1], data);
	     
	     //Push the new block onto the chain
	     this.chain.push(block);
	     
	     return block;
	    }
	 
	 isValidChain(chain)
	    {
	     //Check if chain block 0 matches the genesis block
	     if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
	     
	     //Validate every block following genesis, starting at element 1 and ending at '.length'
	     for(let i = 1; i < chain.length; i++)
	     {
	      const block = chain[i];       //Current block
	      const lastBlock = chain[i-1]; //Previous block
	      
	      //Compare current block 'lastHash' with previous block 'hash'
	      //OR compare current block hash with newly generated hash of current block
	      //If validations fail, return false
	      if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false;
	     }
	     
	     //If validations pass, return true
	     return true;
	    }
     
     //Check to ensure that only the longest chain is accepted as the new chain
	 replaceChain(newChain)
	    {
	     //If 'newChain' is less than or equal to the current 'this' chain
	     if(newChain.length <= this.chain.length)
	       {
	        console.log('Recieved chain is not longer than the current chain.');
	        
	        return;
	       }
	     else if(!this.isValidChain(newChain)) 
	            {
	             console.log('Recieved chain is not valid.');
				 
				 return;
				}
		 
		 //Repalce chain after successful length and validity checks
		 console.log('Repalcing blockchain with the new chain');
		 this.chain = newChain;
	    }
	}

//Export Blockchain class
module.exports = Blockchain;
