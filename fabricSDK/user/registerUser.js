'use strict';
var Fabric_Client = require('fabric-client');
var Fabric_CA_Client = require('fabric-ca-client');
var path = require('path');
var util = require('util');
var os = require('os');
var fabric_client = new Fabric_Client();
var fabric_ca_client = null;
var member_user = null;
var store_path = path.join(__dirname, 'hfc-key-store');
var AFFILIATION = "org1.department1";
const CA_IP = "http://localhost:7054";
const MSP_ID = "Org1MSP";

const registerUser = async(user, secret)=>{
    try{
        var state_store = await Fabric_Client.newDefaultKeyValueStore({path: store_path});
        fabric_client.setStateStore(state_store);
        var crypto_suite = Fabric_Client.newCryptoSuite();
        var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
        crypto_suite.setCryptoKeyStore(crypto_store);
        fabric_client.setCryptoSuite(crypto_suite);
        var tlsOptions = {
            trustedRoots: [],
            verify: false
        };
        fabric_ca_client = new Fabric_CA_Client(CA_IP, null , '', crypto_suite);
        var user_from_store = await fabric_client.getUserContext(user, true);

        if(user_from_store && user_from_store.isEnrolled()){
            throw new Error("already");
        }else {
            var enrollment = await fabric_ca_client.enroll({enrollmentID: user, enrollmentSecret: secret});
            var enrolledUser = await fabric_client.createUser({
                username: user,
                mspid: MSP_ID,
                cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
            });
            member_user = enrolledUser;
            await fabric_client.setUserContext(member_user);
            return 1;
        }
    }catch(err){
        if(err=='already'){
            return 1;
        }else{
            return 0;
        }
    }
}

module.exports = {
    registerUser : registerUser
}