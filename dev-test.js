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
