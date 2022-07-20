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
	}

module.exports = TransactionPool;
