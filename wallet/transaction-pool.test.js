const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
								   let tp, wallet, transaction;
								   
								   beforeEach(() => {
								                     tp = new TransactionPool();
								                     wallet = new Wallet();
								                     
								                     //Create new transaction based on arguments
								                     transaction = Transaction.newTransaction(wallet, 'randomTransaction111', 30);
								                     
								                     //Call 'updateOrAddTransaction' method for 'tp' to add 'transaction'
								                     tp.updateOrAddTransaction(transaction);
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
								                                                  const newTransaction = transaction.updateTransaction(wallet, 'randomTransaction222', 40);
								                                                  
								                                                  //Add 'newTransaction' to transaction pool
								                                                  tp.updateOrAddTransaction(newTransaction);
								                                                  
								                                                  //Find matching id within transaction pool that matches 'newTransaction' and stringify results
								                                                  //Compare stringified results to 'oldTransaction' and check if they are not equal
								                                                  expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
								                                                 }
								     );
								  }
		);
