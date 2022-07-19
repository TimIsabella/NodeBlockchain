const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
							   let transaction, wallet, recipient, amount;
							   
							   //
							   beforeEach(() => {
							                     wallet = new Wallet();                                                 //Create new wallet
							                     amount = 50;                                                           //Set balance to 50
							                     recipient = 'r3c1p13nt';                                               //Recipient address
							                     transaction = Transaction.newTransaction(wallet, recipient, amount);   //Create transaction based on above
							                    }
							             );
							   
							   //
							   it('transactions amount subtracted from sender wallet', () => {
				                                                                              expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
				                                                                             }
							     );
							   
							   //
							   it('transaction amount subtracted from recipient wallet', () => {
							                                                                    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
							                                                                   }
							     );
							   
							   //
							   it('inputs wallet balance', () => {
							                                      expect(transaction.input.amount).toEqual(wallet.balance);
							                                     }
							     );
							   
							   it('validates a valid transaction', () => {
							                                              expect(Transaction.verifyTransaction(transaction)).toBe(true);
							                                             }
							     )
							   
							   it('invalidates a corrupt transaction', () => {
							                                                  transaction.outputs[0].amount = 50000;
							                                                  expect(Transaction.verifyTransaction(transaction)).toBe(false);
							                                                 }
							     )
							   
							   //
							   describe('transaction amount exceeds balance', () => {
							                                                         beforeEach(() => {
							                                                                           amount  = 50000;
							                                                                           transaction = Transaction.newTransaction(wallet, recipient, amount);
							                                                                          }
							                                                                   )
							                                                         
							                                                         it('does not create the transaction', () => {
							                                                                                                      expect(transaction).toEqual(undefined);
							                                                                                                     }
																					   )
							                                                        }
							           )
							  }
		)
