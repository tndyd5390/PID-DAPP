var express = require('express');
var router = express.Router();
var registerUser = require('../fabricSDK/user/registerUser');
const fetch = require('node-fetch');

_registerUser = async(user, affiliation) =>{
    const params = {
        user : user,
        affiliation : affiliation
    };
    var result = await fetch('http://192.168.40.128:3000/fabric/registerUser', {
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

    return result;
};

router.post('/createUser', async(req, res, next)=>{
    var {body : {id}} = req;
    console.log(id);
    var affiliation = 'org1.department1'
    var result = await _registerUser(id, affiliation);
    if(result.already){
        res.render('redirect', {msg : '이미 존재하는 ID입니다', url : '/register'});
    }else{
        await registerUser.registerUser(id, result.secret);
        res.render('redirect', {msg : '가입완료', url : '/login'});
    }
});

router.post('/loginProc', async(req, res)=>{
    var session = req.session;
    var {body : {id, password}} = req;
    var result = await registerUser.registerUser(id, password);

    if(result==0){
        res.render('redirect', {msg : '로그인 정보를 확인해주세요.', url:'/login'})
    }else{
        session.id = id;
        res.redirect('/index');
    }
});

module.exports = router;
