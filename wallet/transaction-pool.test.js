const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
								   let tp, wallet, transaction;
								   
								   beforeEach(() => {
								                     tp = new TransactionPool();
								                     wallet = new Wallet();
								                     
								                     //Create new transaction based on arguments
								                     //transaction = Transaction.newTransaction(wallet, 'randomTransaction111', 30);
								                     
								                     //Call 'updateOrAddTransaction' method for 'tp' to add 'transaction'
								                     //tp.updateOrAddTransaction(transaction);
								                     
								                     //Create new transaction based on arguments
								                     transaction = wallet.createTransaction('randomTransaction111', 30, tp);
								                    }
								             );
								             
								   it('adds transaction to the pool', () => {
								                                             //Check that 'tp.transactions' contains a transaction with matching id from 'transaction' and that both transactions match
								                                             expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
								                                            }
								     );
								   
								   it('updates a transaction in the pool', () => {
								                                                  //Stringified original transaction object
								                                                  const oldTransaction = JSON.stringify(transaction);
								                                                  
								                                                  //Newly created transaction which updates the current transaction from the same wallet
								                                                  const newTransaction = transaction.updateTransaction(wallet, 'randomTransaction333', 40);
								                                                  
								                                                  //Add 'newTransaction' to transaction pool
								                                                  tp.updateOrAddTransaction(newTransaction);
								                                                  
								                                                  //Find matching id within transaction pool that matches 'newTransaction' and stringify results
								                                                  //Compare stringified results to 'oldTransaction' and check if they are not equal
								                                                  expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
								                                                 }
								     );
								     
								   describe('Mixing valid and corrupt transactions', () => {
								                                                            let validTransactions;
								                                                            
								                                                            beforeEach(() => {
								                                                                              //Set to all current transactions
								                                                                              validTransactions = [...tp.transactions];
								                                                                              
								                                                                              //Create transactions;
								                                                                              for(let i = 0; i < 6; i++)
								                                                                                 {
								                                                                                  wallet = new Wallet();
								                                                                                  
								                                                                                  //Creates a new transaction
								                                                                                  transaction = wallet.createTransaction('randomTransaction111', 30, tp);
								                                                                                  
								                                                                                  //Changes input every other index to cause an invalid transaction
								                                                                                  if(i%2 == 0) {transaction.input.amount = 99999;}
								                                                                                  else {validTransactions.push(transaction);}
								                                                                                 }
								                                                                             }
								                                                                      );
								                                                            
								                                                            it('shows a difference between valid and corrupt transactions', () => {
								                                                                                                                                   //Expect transactions from pool to not equal 'validTransactions'
								                                                                                                                                   expect(JSON.stringify(tp.transactions))
								                                                                                                                                   .not.toEqual(JSON.stringify(validTransactions));
								                                                                                                                                  }
								                                                              );
								                                                            
								                                                            it('grab valid transactions', () => {
								                                                                                                 //Expect transactions from pool to equal 'validTransactions'
								                                                                                                 expect(tp.validTransactions())
								                                                                                                 .toEqual(validTransactions);
								                                                                                                }
								                                                              );
								                                                           }
								           );
								  }
		);
