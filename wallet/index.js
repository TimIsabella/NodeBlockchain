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
	}

module.exports = Wallet;
