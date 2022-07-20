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
	
	 //Adds an additional recipient and quantity to the transaction object
	 updateTransaction(senderWallet, recipient, amount)
	    {
	     //'find' within 'outputs' the previously generated transaction object which matches the 'publicKey' of the 'senderWallet'
	     //Purpose is to get the amount reamining in the sender wallet
	     //'senderOutput' becomes a reference to 'this.outputs' of the transaction object
	     const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
	     
	     //Ensure that 'amount' to be sent does not exceed the sender wallet balance
	     if(amount > senderOutput.amount)
	       {
	        console.log(`Amount: ${amount} exceeds balance.`);
	        return;
	       }
	     
	     //Subtract 'amount' from output -- 'senderOutput' as a reference is updating 'this.outputs.amount'
	     senderOutput.amount = senderOutput.amount - amount;
	     
	     //Push new 'amount' of 'recipient' to transaction
	     this.outputs.push({amount, address: recipient});
	     
	     //Transaction has changed and needs to be signed again
	     Transaction.signTransaction(this, senderWallet);
	     
	     //Return 'this' transaction
	     return this;
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
