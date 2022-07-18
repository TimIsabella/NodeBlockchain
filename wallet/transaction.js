const ChainUtil = require('../chain-util');

class Transaction
	{
	 constructor()
	    {
	     this.id = ChainUtil.id(); //Get generated uuid
	     this.input = null;
	     this.outputs = [];
	    }
	 
	 //Transaction method
	 static newTransaction(senderWallet, recipient, amount)
	    {
	     //Transaction based on constructor
	     const transaction = new this();
	     
	     //Transaction amount is greater than sender wallet balance and return
	     if(amount > senderWallet.balance) 
	       {
	        console.log(`Amount: ${amount} exceeds balance.`);
	        return;
	       }
	     
	     //Create transaction
	     transaction.outputs.push(...[
	                                  {amount: senderWallet.balance - amount, address: senderWallet.publicKey}, //sender wallet balance minus amount, sender wallet address
	                                  {amount, address: recipient}                                              //ammount and recipient wallet address
	                                 ]
	                             );
	     return transaction;
	    }
	}

module.exports = Transaction;
