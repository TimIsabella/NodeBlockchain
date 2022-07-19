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
	     //sender wallet balance minus amount, sender wallet address
	     //ammount and recipient wallet address
	     transaction.outputs.push(...[{amount: senderWallet.balance - amount, address: senderWallet.publicKey}, {amount, address: recipient}]);
	     
	     //Call transaction
	     Transaction.signTransaction(transaction, senderWallet);
	     
	     return transaction;
	    }
	
	 //Sign the transaction
	 static signTransaction(transaction, senderWallet)
	    {
	     transaction.input = {
	                          timeStamp: Date.now(),
	                          amount: senderWallet.balance,
	                          address: senderWallet.publicKey,
	                          signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
	                         }
	    }
	
	 //Verify the transaction
	 static verifyTransaction(transaction)
	    {
	     //Call 'verifySignature' with transaction
	     return ChainUtil.verifySignature(
	                                      transaction.input.address,
	                                      transaction.input.signature, 
	                                      ChainUtil.hash(transaction.outputs)
	                                     );
	    }
	}

module.exports = Transaction;
