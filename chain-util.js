const EC = require('elliptic').ec;   //EC = 'Elliptic Cryptography'
const ec = new EC('secp256k1');      //Istance of EC as implementation type 'secp256k1' -- 'Standards of Efficient Cryptography Prime at 256 bits, Koblitz implementation #1'
const uuidV1 = require('uuid').v1(); //Import 'Universally Unique Identifier' of version 1

class ChainUtil 
	{
	 //Generate EC key pair
	 static genKeyPair()
	    {
	     return ec.genKeyPair(); //Return the EC key pair object
	    }
	    
	 //Generate unique ID
	 static id()
	    {
	     return uuidV1; //Return ID
	    }
	}

module.exports = ChainUtil;
