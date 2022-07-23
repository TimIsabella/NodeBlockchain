const Transaction = require('../wallet/transaction');

class TransactionPool
	{
	 constructor()
	    {
		 this.transactions = [];
		};
	 
	 //Method for adding and updating pool transactions
	 updateOrAddTransaction(transaction)
	    {
	     //Find 'id' within 'transactions' array matching same id as 'transaction' parameter
	     let transactionWithId = this.transactions.find(t => t.id === transaction.id);
	     
	     //If 'transactionWithId' exists, replace within array
	     if(transactionWithId)
	       {
	        //Get array index of 'transactions' that matches 'transactionWithId' and replace with 'transaction' parameter
	        this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
	       }
	     //If 'transactionWithId' doesn't exist, add to array
	     else
	       {
	        //Push 'transaction' parameter to 'transactions' array
	        this.transactions.push(transaction);
	       }
	    };
	
	 //Verify that a transaction in the pool exists by 'address' wallet public key
     existingTransaction(address)
        {
         //Find transaction within the pool which matches the parameter 'address' wallet public key and return
         return this.transactions.find(t => t.input.address === address);
        };
     
     //Returns validated transactions
     validTransactions()
        {
         //Check each transaction in the pool and only return if passed validation steps
         return this.transactions.filter(transaction => {
                                                         //Add up transaction output amounts to get total
                                                         const outputTotal = transaction.outputs.reduce((total, output) => {
                                                                                                                             return total + output.amount;
                                                                                                                           }, 0 //initial total value
                                                                                                       );
                                                         
                                                         //Compare added transaction ouput total with input amount, and reject if they do not match
                                                         if(transaction.input.amount !== outputTotal)
                                                           {
                                                            console.log(`Invalid transaction from ${transaction.input.address}.`);
                                                            return;
                                                           }
                                                        
                                                         //Send transaction to 'verifyTransaction' for signature verification, and reject if return false
                                                         if(!Transaction.verifyTransaction(transaction))
                                                           {
                                                            console.log(`Invalid signature from ${transaction.input.address}.`);
                                                            return;
                                                           }
                                                        
                                                         //Passed all validations
                                                         return transaction;
                                                        }
                                        );
        };
    
     //Clears the transaction pool
     clearTransactions()
        {
         this.transactions = [];
        }
	}

module.exports = TransactionPool;
