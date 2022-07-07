const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
							  let bc, bc2;
							  
							  beforeEach(() => {
							                    //'bc' equals Blockchain class
							                    bc = new Blockchain();
							                    bc2 = new Blockchain();
							                   }
							            );
							  
							  //Check if blockchain 'bc' starts with genesis block
							  it('Starts with genesis block', () => {
							                                         //Check if first block in chain equals genesis block
																	 expect(bc.chain[0]).toEqual(Block.genesis());
							                                        }
							    );
							  
							  //Add block to chain 'bc' then check if previous block data match
							  it('adds a new block', () => {
							                                const data = 'new data';
							                                bc.addBlock(data);  //Create block in 'bc' chain with 'data' using 'addBlock()' method from 'blockchain.js'
							                                
							                                //Check if last block in 'bc' chain -1 equals 'data'
							                                expect(bc.chain[bc.chain.length-1].data).toEqual(data);
							                               }
							    );
							  
							  //
							  it('validates a valid chain', () => {
																   //const data = 'new data';
																   bc2.addBlock('new data');  //Create block in 'bc2' chain with 'data' using 'addBlock()' method from 'blockchain.js'
																   
																   //Validate 'bc' chain with 'bc2' chain by using 'isValidChain()' method from 'blockchain.js' by comparing the two with output '.toBe()'
																   expect(bc.isValidChain(bc2.chain)).toBe(true);
							                                      }
							    );
							 }
		);
