var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

_emailChk = async (email) =>{
    const param = {
        email : email
    };
    var result = await fetch('http://192.168.40.129:3000/users/checkDupEmail', {
        method : 'post',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(param)
    }).then((response)=> response.json())
    .then((res=>{
        return res;
    }));

    return result;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/emailChk', async(req, res)=>{
    var {body : {email}} = req;
    console.log(email);
    var result = await _emailChk(email);

    res.send(result);
})

module.exports = router;
