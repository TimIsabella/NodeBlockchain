const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
							   let transaction, wallet, recipient, amount;
							   
							   //
							   beforeEach(() => {
							                     wallet = new Wallet();                                                 //Create new wallet
							                     amount = 50;                                                           //Set balance to 50
							                     recipient = 'RecipientWalletAddress';                                  //Recipient address
							                     transaction = Transaction.newTransaction(wallet, recipient, amount);   //Create transaction based on above
							                    }
							             );
							   
							   //
							   it('transactions amount subtracted from sender wallet', () => {
				                                                                              expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount
				                                                                                    ).toEqual(wallet.balance - amount);
				                                                                             }
							     );
							   
							   //
							   it('transactions amount subtracted from recipient balance', () => {
							                                                                      expect(
							                                                                             transaction.outputs.find(output => output.address === recipient).amount
							                                                                            ).toEqual(amount);
							                                                                     }
							     );
							   
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
