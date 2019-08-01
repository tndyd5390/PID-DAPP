var express = require('express');
var router = express.Router();
var registerUser = require('../fabricSDK/user/registerUser');
const fetch = require('node-fetch');

_registerUser = async(user, affiliation) =>{
    const params = {
        user : user,
        affiliation : affiliation
    };
    var secret = await fetch('http://192.168.40.128:3000/fabric/registerUser', {
        method : 'post',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(params)
    }).then((response)=> response.json())
    .then((res => {
        return res;
    }))

    return secret;
}



router.post('/createUser', async function(req, res, next) {
    var {body : {id}} = req;
    console.log(id);
    var affiliation = 'org1.department1'
    //var secret = await _registerUser(user, affiliation);
    //await registerUser.registerUser(user, secret.secret,affiliation);
});

module.exports = router;
