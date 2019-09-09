const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const axios = require("axios");

_nvl = (str) => {
    return str || "";
}

_strIsEmpty = (str) => {
	if (typeof str == "undefined" || str == null || str == "") return true;
	else return false;
}

_loginCheck = (req, res) => {
    var sess = req.session;
    if( 
        _strIsEmpty(_nvl(sess.companyNo)) && 
        _strIsEmpty(_nvl(sess.companyName)) &&
        _strIsEmpty(_nvl(sess.companyId))
    ){
        res.render("redirect", {msg: "로그인이 필요합니다.", url: "/company/login"});
    }
}

sessionDestory = req => {
    return new Promise((resolve, reject) => {
        resolve(req.session.destory(err => {}))
    })
}

router.get("/", async(req, res) => {
    _loginCheck(req, res);
    try{
        var response = await axios.get("http://192.168.109.132:5000/company");
        res.render("company/companyList", {companyList: response.data});
    }catch(err){
        console.log(err);
    }
})

router.get("/signup", async(req, res) => {
    res.render("company/signup")
})

router.get("/login", async(req, res) => {
    var sess = req.session;
    if( 
        !_strIsEmpty(_nvl(sess.companyNo)) && 
        !_strIsEmpty(_nvl(sess.companyName)) &&
        !_strIsEmpty(_nvl(sess.companyId))
    ){
        res.redirect("/company/" + sess.companyNo);
    }
    res.render("company/companyLogin")
})

router.get("/:companyNo", async(req, res) => {
    _loginCheck(req, res);
    var {params: {companyNo}} = req;
    var sess = req.session;
    if(sess.companyNo != companyNo){
        res.redirect("/");
    }
    try{
        var response = await axios.get("http://192.168.109.132:5000/company/" + companyNo);
        res.render("company/companyDetail", {company: response.data});
    }catch (err) {
        console.log(err);
        res.send(null);
    }
})

router.post("/", async(req, res) => {
    var {body: {
            companyName, 
            companyRegistrationNumber,
            companyRepresentativeName,
            companyContactNumber,
            companyId,
            password,
            companyPostCode,
            address,
            addressDetail
        }
    } = req;
    
    try{
        var response = await axios.post("http://192.168.109.132:5000/company", {
            companyName, 
            companyRegistrationNumber,
            companyRepresentativeName,
            companyContactNumber,
            companyId,
            password,
            companyPostCode,
            address,
            addressDetail
        })
        res.render("redirect", {msg:"등록완료", url:"/"});

    } catch (err) {
        console.log(err);
    }
    
})

router.get("/checkCompanyRegistrationNumber/:registrationNumber", async(req, res) => {
    var {params:{registrationNumber}} = req;
    try{
        var response = await axios.get("http://192.168.109.132:5000/company/checkCompanyRegistrationNumber/" + registrationNumber);
        res.send(String(response.data));
    }catch(err){
        console.log(err);
        res.send(true);
    }
})

router.get("/checkCompanyId/:companyId", async(req, res) => {
    var {params: {companyId}} = req;
    try {
        var response = await axios.get("http://192.168.109.132:5000/company/checkCompanyId/" + companyId);
        res.send(String(response.data));
    } catch(err) {
        console.log(err);
        res.send(true);
    }
})

router.post("/approveCompanyJoin", async(req, res) => {
    var {body: {companyNo}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/approveCompanyJoin", {companyNo});
        if(response.data){
            res.render("redirect", {msg:"승인완료", url:"/company"})
        } else {
            res.render("redirect", {msg:"승인실패", url:"/company"})
        }
    }catch(err) {
        console.log(err);
    }
})

router.put("/:companyNo", async(req, res) => {
    _loginCheck(req, res);
    var {params: {companyNo}} = req;

    var {body: {
        companyName,
        companyRegistrationNumber,
        companyRepresentativeName,
        companyContactNumber,
        companyId,
        companyAddress,
        companyAddressDetail,
        companyReqStatus
    }} = req;

    var companyObj = {
        companyName,
        companyRegistrationNumber,
        companyRepresentativeName,
        companyContactNumber,
        companyId,
        companyAddress,
        companyAddressDetail,
        companyReqStatus
    };

    try{
        var response = await axios.put("http://192.168.109.132:5000/company/" + companyNo, {companyObj})
        res.send(response.data);
    } catch(err) {
        console.log(err);
    }
})

router.post("/updatePasswordCheck", async(req,res) => {
    _loginCheck(req, res);
    var {body: {companyNo, password}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/checkPassword", {companyNo, password});
        if(response.data){
            res.render("company/updatePasswordView", {companyNo});

        }else{
            res.render("redirect", {msg:"비밀번호가 다릅니다.", url:"/"})
        }
    } catch(err) {
        console.log(err);
        res.render("redirect", {msg:"에러", url:"/"})
    }
})

router.post("/updatePasswordProc", async(req, res) => {
    _loginCheck(req, res);
    var {body: {newPassword, companyNo}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/updatePassword", {companyNo, newPassword});
        var obj = {}
        if(response.data){
            obj.msg = "비밀번호가 변경되었습니다.";
            obj.url = "/";
        } else {
            obj.msg = "비밀번호 변경에 실패했습니다.";
            obj.url = "/";
        }
        res.render("redirect", obj);
    }catch(err) {
        console.log(err);
    }
})

router.post("/updateAllPasswordCheck", async(req, res) => {
    _loginCheck(req, res);
    var {body: {companyNo, passwordForUpdate}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/checkPassword", {companyNo, password: passwordForUpdate});
        if(response.data){
            var companyObj = await axios.get("http://192.168.109.132:5000/company/" + companyNo)
            
            res.render("company/updateCompanyView", {company:companyObj.data});
        }else{
            res.render("redirect", {msg:"비밀번호가 다릅니다.", url:"/"})
        }
    } catch(err) {
        res.render("redirect", {msg:"에러", url:"/"})
    }
})

router.post("/getCompanyReqStatus", async(req, res) => {
    var {body: {companyNo}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/getCompanyReqStatus", {companyNo});
        res.send(String(response.data));
    }catch(err){
        console.log(err);
    }
})

router.post("/loginProc", async(req, res) => {
    var {body: {id, password}} = req;
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/loginProc", {id, password});
        console.log(response.data);
        if(response.data){
            var session = req.session;
            session.companyId = id;
            session.companyNo = response.data.companyNo;
            session.companyName = response.data.companyName;
            res.redirect("/company/" + response.data.companyNo);
        }else{
            res.render("redirect", {url: "/company/login", msg: "아이디와 비밀번호가 일치하지 않습니다."})
        }
    } catch(err) {
        console.log(err);
    }
})
module.exports = router;