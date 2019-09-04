var express = require('express');
var router = express.Router();
var registerUser = require('../fabricSDK/user/registerUser');
const fetch = require('node-fetch');

_registerUser = async(email, password,affiliation) =>{
    const params = {
        email : email,
        password : password,
        affiliation : affiliation
    };
    var result = await fetch('http://192.168.40.129:3000/users/registerUser', {
        method : 'post',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(params)
    }).then((response)=> response.json())
    .then((res => {
        return res;
    }));

    return result;
};

_loginProc = async(email, password)=>{
    const params = {
        email : email,
        password : password
    };
    var result = await fetch('http://192.168.40.129:3000/users/loginProc', {
        method : 'post',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(params)
    }).then((response)=>response.json()).
    then((res=>{
        console.log(res);
        return res;
    }));

    return result;
}

router.post('/createUser', async(req, res, next)=>{
    var {body : {email, password}} = req;
    var affiliation = 'org1.department1'
    var result = await _registerUser(email, password, affiliation);
    await registerUser.registerUser(email, result.secret);
    res.render('redirect', {msg : '가입완료', url : '/login'});
});

router.post('/loginProc', async(req, res)=>{
    var session = req.session;
    var {body : {email, password}} = req;
    var result = await _loginProc(email, password);
    if(result.COUNT == 1){
        var erollUser = await registerUser.registerUser(email, result.SECRET);
        session.email = email;
        session.auth = result.AUTH
        res.redirect('/');

    }else{
        res.render('redirect', {msg : '로그인 정보를 확인해주세요.', url:'/login'})
    }
});

module.exports = router;
