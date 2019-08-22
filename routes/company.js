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

router.get("/", async(req, res) => {
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
        res.send(response.data);
    }catch(err){
        console.log(err);
        res.send(true);
    }
})

router.get("/checkCompanyId/:companyId", async(req, res) => {
    var {params: {companyId}} = req;
    try {
        var response = await axios.get("http://192.168.109.132:5000/company/checkCompanyId/" + companyId);
        res.send(response.data);
    } catch(err) {
        console.log(err);
        res.send(true);
    }
})

// router.get("/signupList", async(req, res) => {
//     try{
//         var response = await axios.get("http://192.168.109.132:5000/company/signupList");
//         res.render("company/signupList", {companyReqList: response.data});
//     }catch(err){
//         console.log(err);
//     }
// })

router.put("/:companyNo", async(req, res) => {
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
        console.log(response.data);
        res.send(response.data);
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
