const Block = require('./block');

describe('Block', () => {
						 let data, lastBlock, block;
						 
						 beforeEach(() => {
										   data = 'Genesis data';
										   lastBlock = Block.genesis();
										   block = Block.mineBlock(lastBlock, data);
						                  }
						           );

						 //'it()' is a Jest method
						 it('Sets the `data` to match the input', () => {
						                                                 //'expect()' is a Jest method used to take input and chain additional methods on top of it
						                                                 //Used to describe what we 'expect' in that inputted data to be
						                                                 //The below 'expects' block.data 'toEqual' data
						                                                 expect(block.data).toEqual(data);
						                                                }
						   );
						 
						 it('Sets the `lastHash` to match hash of last block', () => {
						                                                              expect(block.lastHash).toEqual(lastBlock.hash);
						                                                             }
						   );
						}
		);
		
