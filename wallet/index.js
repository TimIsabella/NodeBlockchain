//////////////////////////////////
///////////WALLET INDEX///////////
//////////////////////////////////

const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet
	{
     constructor()
     {
      this.balance = INITIAL_BALANCE;
      this.keyPair = ChainUtil.genKeyPair();                   //Generate wallet key pair object
      this.publicKey = this.keyPair.getPublic().encode('hex'); //Get wallet public key from 'keyPair' object and encode into hexidecimal string
     }
     
     toString()
        {
         return `Wallet - 
                 publicKey: ${this.publicKey.toString()}
                 balance  : ${this.balance}`;
        }
	}

module.exports = Wallet;
