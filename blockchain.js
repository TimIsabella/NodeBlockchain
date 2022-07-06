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
	}

//Export Blockchain class
module.exports = Blockchain;
