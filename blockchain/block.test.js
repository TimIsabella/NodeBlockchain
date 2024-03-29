const Block = require("./block");

//Destructure 'DIFFICULTY' export from 'config.js'
//const { DIFFICULTY } = require('../config');

describe("Block", () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = "Genesis data";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    //'it()' is a Jest method
    it("Sets the `data` to match the input", () => {
    
        //'expect()' is a Jest method used to take input and chain additional methods on top of it
        //Used to describe what we 'expect' in that inputted data to be
        //The below 'expects' block.data 'toEqual' data
        expect(block.data).toEqual(data);
    });

    it("Sets the `lastHash` to match hash of last block", () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it("Generates a hash that matches the difficulty", () => {
    
        //'expect' block.hash to substringed of 'DIFFICULTY' number of 0's to equal 0's of 'DIFFICULTY' number
        //expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        //console.log(block.toString());

        //'expect' block.hash to substringed of 'block.difficulty' number of 0's to equal 0's of 'block.difficulty' number
        expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty));
    });

    it("Lowers the difficulty for slowly mined blocks", () => {
    
        //Compare current block with same block with timestamp plus 1 hour (in miliseconds)
        //Check if return is difficulty - 1
        expect(Block.adjustDifficulty(block, block.timeStamp + 360000)).toEqual(block.difficulty - 1);
    });

    it("Raises the difficulty for quickly mined blocks", () => {
        expect(Block.adjustDifficulty(block, block.timeStamp + 1)).toEqual(block.difficulty + 1);
    });
});
