const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec; //EC = 'Elliptic Cryptography'
const ec = new EC("secp256k1"); //Istance of EC as implementation type 'secp256k1' -- 'Standards of Efficient Cryptography Prime at 256 bits, Koblitz implementation #1'
const uuid = require("uuid"); //Import 'Universally Unique Identifier'

class ChainUtil {

    //Generate EC key pair
    static genKeyPair() {
        return ec.genKeyPair(); //Return the EC key pair object
    }

    //Generate unique ID
    static id() {
        return uuid.v1(); //Return ID (uuid version 1)
    }

    //Convert input to SHA256 hash string
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    //Verify the signature where: publicKey + signature = dataHash
    static verifySignature(publicKey, signature, dataHash) {
    
        //Elliptic module 'keyFromPublic' method is used to verify the signature
        //publicKey was originally encoded to 'hex' and now must be decoded in 'hex'
        //Returns either true/false
        return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
    }
}

module.exports = ChainUtil;
