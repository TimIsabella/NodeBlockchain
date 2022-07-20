//////////////////////////////////
///////////WALLET INDEX///////////
//////////////////////////////////

const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE } = require('../config');

class Wallet
	{
     constructor()
     {
      this.balance = INITIAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair();                   //Generate wallet key pair object
      this.publicKey = this.keyPair.getPublic().encode('hex'); //Get wallet public key from 'keyPair' object and encode into hexidecimal string
     }
     
     //Output wallet information
     toString()
        {
         return `Wallet - 
                 publicKey: ${this.publicKey.toString()}
                 balance  : ${this.balance}`;
        }
     
     //Takes in data hash and outputs a signature
     sign(dataHash)
        {
         //Elliptic 'sign' method -- returns signature based on key pair, private key, and hashed data. Used to verify the authenticity of the signature
         return this.keyPair.sign(dataHash);
        }
    
     //Creates a transaction for the pool or replaces one that already exists
     createTransaction(recipient, amount, transactionPool)
        {
         //If 'amount' is greater than wallet balance
         if(amount > this.blanace)
		   {
		    console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
		    return;
		   }
		
		 //Set 'transaction' of 'transactionPool' to one that matches the wallet public key by calling 'existingTransaction'
		 let transaction = transactionPool.existingTransaction(this.publicKey);
		 
		 //Match found
		 if(transaction)
		   {
		    //Call 'updateTransaction' method with arguments
		    transaction.updateTransaction(this, recipient, amount);
		   }
		 //No match found (returned undefined)
		 else
		   {
		    //New transaction with arguments
		    transaction = Transaction.newTransaction(this, recipient, amount);
		    
		    //New transaction sent to pool through 'updateOrAddTransaction' method
		    transactionPool.updateOrAddTransaction(transaction);
		   }
		   
		 return transaction;
        }
	}

module.exports = Wallet;
