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
							  
							  //Compare previous chain to new chain
							  it('validates a valid chain', () => {
																   const data = 'new data';
																   bc2.addBlock(data);  //Create block in 'bc2' chain with 'data' using 'addBlock()' method from 'blockchain.js'
																   
																   //Validate 'bc' chain with 'bc2' chain by using 'isValidChain()' method from 'blockchain.js' by comparing the two with output '.toBe()'
																   expect(bc.isValidChain(bc2.chain)).toBe(true);
							                                      }
							    );
							
							  //Change the 'bc2.chain' element 0 (genesis block) data to 'Bad data' and compare with 'bc' chain. Expect to return 'false' because they don't match
							  it('invalidates a chain with a corrupt genesis block', () => {
							                                                                bc2.chain[0].data = 'Bad data';
							                                                                
							                                                                expect(bc.isValidChain(bc2.chain)).toBe(false);
							                                                               }
							   );
							  
							  //Change 'bc2.chain' element 1 data to 'Not new data' and compare with 'bc' chain. Expect to return 'false' because they don't match
							  it('invalidates a corrupt chain', () => {
																	   const data = 'new data';
																	   bc2.addBlock(data);
																	   bc2.chain[1].data = 'Not new data';
																	   
																	   expect(bc.isValidChain(bc2.chain)).toBe(false);
							                                          }
							    )
							 }
		);
