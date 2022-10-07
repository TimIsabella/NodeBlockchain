/*
const Block = require('./block');

//Create block based on the arguments
const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log(block.toString());

//Create genesis block
const genesisBlock = Block.genesis();
console.log(genesisBlock.toString());

//Create 'mineBlock' using genesis block and adding in 'content' for data
const fooBlock = Block.mineBlock(Block.genesis(), 'content');
console.log(fooBlock.toString());
*/

/*
const Blockchain = require('./blockchain');

const bc = new Blockchain();

//Add 10 blocks to the chain
for (let i = 0; i < 10; i++) {
    console.log(bc.addBlock(`New data ${i}`).toString());
}
*/

const Wallet = require("./wallet");
const wallet = new Wallet();
console.log(wallet.toString());
