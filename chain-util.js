const EC = require('elliptic').ec; //EC = 'Elliptic Cryptography'
const ec = new EC('secp256k1');    //Istance of EC as implementation type 'secp256k1' -- 'Standards of Efficient Cryptography Prime at 256 bits, Koblitz implementation #1'

class ChainUtil 
	{
	 //Generate EC key pair
	 static genKeyPair()
	    {
	     return ec.genKeyPair(); //Return the EC key pair object
	    }
	}

module.exports = ChainUtil;
