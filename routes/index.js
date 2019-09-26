var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var session = req.session;
    console.log(session);
    if(session.email==null || session.email==''){
        res.render('redirect', {msg : '로그인 정보를 확인해주세요.', url:'/login'})
    }else{
        res.render('index', { title: 'Express' });
    }
});

router.get('/login', (req, res)=>{
    res.render('login');
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.get("/logout", async (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
    });
    res.redirect("/");
})

module.exports = router;