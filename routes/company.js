const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const axios = require("axios");

router.get("/", async(req, res) => {

})

router.get("/compReqJoinView", async(req, res) => {
    res.render("compReqJoin")
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
        console.log(response.data);

    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;
