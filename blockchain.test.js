const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
							  let bc;
							  
							  beforeEach(() => {
							                    //'bc' equals Blockchain class
							                    bc = new Blockchain();
							                   }
							            );
							            
							  it('Starts with genesis block', () => {
							                                         //Check if first block in chain equals genesis block
																	 expect(bc.chain[0]).toEqual(Block.genesis())
							                                        }
							    );
							    
							  it('adds a new block', () => {
							                                const data = 'new data';
							                                bc.addBlock(data);
							                                
							                                //Check if last block -1 equals data
							                                expect(bc.chain[bc.chain.length-1].data).toEqual(data);
							                               }
							    );
							 }
		);
