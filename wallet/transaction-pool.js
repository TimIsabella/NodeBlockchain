class TransactionPool
	{
	 constructor()
	    {
		 this.transactions = [];
		}
	 
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
	    }
	
	 //Verify that a transaction in the pool exists by wallet public key
     existingTransaction(address)
        {
         //Find transaction within the pool which matches the parameter 'address' wallet public key and return
         return this.transactions.find(t => t.input.address === address);
        }
	}

module.exports = TransactionPool;
