const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const axios = require("axios");

router.get("/", async(req, res) => {

})

router.get("/compReqJoinView", async(req, res) => {
    res.render("company/companyReqJoin")
})

router.post("/compReqJoinProc", async(req, res) => {
    var {body: {
            companyName, 
            companyRegistrationNumber,
            companyRepresentativeName,
            companyId,
            password,
            companyPostCode,
            address,
            addressDetail
        }
    } = req;
    
    try{
        var response = await axios.post("http://192.168.109.132:5000/company/companyJoinRequest", {
            companyName, 
            companyRegistrationNumber,
            companyRepresentativeName,
            companyId,
            password,
            companyPostCode,
            address,
            addressDetail
        })
        res.redirect("/");

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
        console.log(response.data);
        res.send(response.data);
    } catch(err) {
        console.log(err);
        res.send(true);
    }
})

router.get("/companyReqList", async(req, res) => {
    try{
        var response = await axios.get("http://192.168.109.132:5000/company/companyReqList");
        console.log(response.data);
    }catch(err){
        console.log(err);
    }
    res.render("company/companyReqList");
})

module.exports = router;
