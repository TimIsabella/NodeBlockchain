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
     createTransaction(recipient, amount, blockchain, transactionPool)
        {
         //Get balance by '.calculateBalance()' method
         this.balance = this.calculateBalance(blockchain);
         
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
     
     //Calculate the wallet balance
     calculateBalance(blockchain)
      {
       let balance = this.balance; //Set to current balance
       let startTime = 0;
       let transactions = [];
       
       //Push every transaction within 'blockchain' to 'transaction' array
       //- Run loop forEach chain
       //- Within each chain loop, run forEach to capture every transaction
       
       blockchain.chain.forEach(block => block.data.forEach(transaction => {
                                                                            transactions.push(transaction);
                                                                           }
                                                           )
                               );
                               
       //Filter only transactions from above that match the current wallet publicKey
       const walletInputTransactions = transactions.filter(transaction => transaction.input.address === this.publicKey);
       
       //Wallet has transactions history
       if(walletInputTransactions.length > 0)
         {
          //Get only the most recent transactions from the current wallet
          //- if previous timestamp > current timestamp return previous else return current
          const recentInputTransactions = walletInputTransactions.reduce((prev, current) => prev.input.timeStamp > current.input.timeStamp ? prev : current);
          
         //Balance from most recent transaction
         balance = recentInputTransactions.outputs.find(output => output.address === this.publicKey).amount;
       
         //Timestamp from most recent transaction
         startTime = recentInputTransactions.input.timeStamp;
         }
      
       //Set balance by adding up all transactions to current wallet
       transactions.forEach(transaction => {
                                            //If transaction timestamp > 'startTime', find within transaction...
                                            if(transaction.input.timeStamp > startTime) transaction.outputs.find(output => {
                                                                                                                            //If transaction address matches wallet public key, add amount to balance
                                                                                                                            if(output.address === this.publicKey) balance += output.amount;
                                                                                                                           }
                                                                                                                )
                                           }
                           );
                
       return balance;
      }
     
     //Create blockchain wallet
     static blockchainWallet()
        {
         //Wallet based on constructor
         const blockchainWallet = new this();
         
         blockchainWallet.address = 'blockchain-wallet';
         
         return blockchainWallet;
        }
	}

module.exports = Wallet;
