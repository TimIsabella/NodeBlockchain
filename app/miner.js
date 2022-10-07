const Wallet = require("../wallet");
const Transaction = require("../wallet/transaction");

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    //Block mining complete
    //- Create a block of all valid transactions and include 1 reward transaction for the miner
    //- Synchronize peer chains with transactions
    //- Clear local transaction pool and initiate peers to clear their
    //- Return completed block
    mine() {
    
        //Set 'validTransactions' as all validated transactions from current transaction pool
        const validTransactions = this.transactionPool.validTransactions();

        //Push to 'validTransactions' a miner reward transaction to the current wallet
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));

        //Create a block of all valid transactions
        const block = this.blockchain.addBlock(validTransactions);

        //Synchronize chains to all peers
        this.p2pServer.syncChains();

        //Clear transaction pool
        this.transactionPool.clearTransactions();

        //Notify peers to clear their transaction pools
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

module.exports = Miner;
