const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');

describe('Wallet', () => {
						  let wallet, tp, bc;
						  
						  beforeEach(() => {
						                    wallet = new Wallet();
						                    tp = new TransactionPool();
						                    bc = new Blockchain();
						                   }
						            );
						            
						  describe('creating a transaction', () => {
																	let transaction, sendAmount, recipient;
																	  
																	beforeEach(() => {
																	                  sendAmount = 50;
																	                  recipient = 'RandomAddress333';
																	                    
																	                  //Create
																	                  transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
																	                 }
																	          );
																	
																	describe('and doing the same transaction', () => {
																													  beforeEach(() => {
																													                    wallet.createTransaction(recipient, sendAmount, bc, tp);
																													                   }
																													            );
																													  
																													  it('doubles the `sendAmount` subtracted from the wallet balance', () => {
																													                                                                           //Find transaction within pool matching wallet 'publicKey' and return 'amount'
																													                                                                           //Check if wallet 'publicKey' balance - 'sendAmount * 2' matches above
																													                                                                           expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
																													                                                                           .toEqual(wallet.balance - sendAmount * 2);
																													                                                                          }
																													    );
																													    
																													  it('clones the `sendAmount` output of the recipient', () => {
																										                                                                           //Filter only transactions of 'outputs' in which 'address' equals 'recipient'
																										                                                                           //Map only 'outputs' which contain an 'amount'
																										                                                                           //Check that both array index 0 and 1 match 'sendAmount'
																										                                                                           expect(transaction.outputs.filter(output => output.address === recipient)
																										                                                                           .map(output => output.amount))
																										                                                                           .toEqual([sendAmount, sendAmount]);
																										                                                                          }
																													    );
																											         }
																			);
															       }
								  );
				         }
		);
