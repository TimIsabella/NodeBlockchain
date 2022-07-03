const Block = require('./block');

describe('Block', () => {
						 beforeEach(() => {
										   const data = 'data content';
										   const lastBlock = Block.genesis();
										   const block = Block.mineBlock(lastBlock, data);
						                  }
						           );

						 //'it()' is a Jest method
						 it('Sets the `data` to match the input', () => {});
						 
						 it('Sets the `lastHash` to atch hash of last block', () => {});
						}
		);
		
