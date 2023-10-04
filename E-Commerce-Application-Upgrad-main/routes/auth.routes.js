const authController = require("../controllers/auth.controller")
const express = require("express")
const router = express.Router()
const validateUserReqBody = require("../middlewares/validateUserReqBody")

router.post("/signup",[validateUserReqBody.validateUserReqBody], authController.signUp)

router.post("/signin",[validateUserReqBody.validateSignInReq], authController.signIn)

router.all('*', (req, res)=>{
    return res.status(404).send("invalid url")
})
module.exports = router