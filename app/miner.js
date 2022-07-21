class Miner
	{
	 constructor(blockchain, transactionPool, wallet, p2pServer)
	    {
	     this.blockchain = blockchain;
	     this.transactionPool = transactionPool;
	     this.wallet = wallet;
	     this.p2pServer = p2pServer;
	    }
	
	 //Mine method
	 mine()
	    {
	     const validTransactions = this.transactionPool.validTransactions();
	     //TODO: reward for the miner
	     //TODO: create a block consisting of valid transactions
	     //TODO: syncronize chains in the peer-to-peer server
	     //TODO: broadcast to every minor to clear their trsnaction pools
	    }
	}
	
	module.exports = Miner;
