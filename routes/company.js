const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async(req, res) => {

})

router.get("/compReqJoinView", async(req, res) => {
    res.render("compReqJoin")
})

router.post("/compReqJoinProc", async(req, res) => {
    var {body: {
            company, 
            compRegistrationNumber,
            repreName,
            password,
            companyPostCode,
            address,
            addressDetail
        }
    } = req;

    
})

module.exports = router;
