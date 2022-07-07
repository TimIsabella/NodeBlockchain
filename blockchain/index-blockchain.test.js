const Blockchain = require('./index-blockchain');
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
							                                const data = 'New data';
							                                bc.addBlock(data);  //Create block in 'bc' chain with 'data' using 'addBlock()' method from 'blockchain.js'
							                                
							                                //Check if last block in 'bc' chain -1 equals 'data'
							                                expect(bc.chain[bc.chain.length-1].data).toEqual(data);
							                               }
							    );
							  
							  //Compare previous chain to new chain
							  it('validates a valid chain', () => {
																   const data = 'New data';
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
																	   const data = 'New data';
																	   bc2.addBlock(data);
																	   bc2.chain[1].data = 'Not new data';
																	   
																	   expect(bc.isValidChain(bc2.chain)).toBe(false);
							                                          }
							    )
							  
							  
							  it('replaces the chain with a valid chain', () => {
							                                                     //Adds a block with data
							                                                     bc2.addBlock('New data 2');
							                                                     
							                                                     //Compare length and validity of 'bc' chain to 'bc2' chain, then replaces the 'bc' chain with 'bc2' if successful
							                                                     bc.replaceChain(bc2.chain);
							                                                     
							                                                     //Check to compare if 'bc' and 'bc2' chain are equal
							                                                     expect(bc.chain).toEqual(bc2.chain);
							                                                    }
							    );
							    
							  it('does not replace the chain with one of less than or equal to length', () => {
																											   //Add block to 'bc' chain
																											   bc.addBlock('Whatever data');
																											   
																											   //Attempt to replace 'bc' chain with 'bc2' chain
																											   ////Rejected because 'bc' chain is longer than 'bc2' chain by the newly added block
																											   bc.replaceChain(bc2.chain);
																											   
																											   //Compare 'bc' chain and 'bc2' chain, that they are not equal
																											   expect(bc.chain).not.toEqual(bc2.chain);
							                                                                                  }
							    );
							 }
		);
