const addressController =  require("../controllers/address.controller")
const express = require("express")
const addressRouter = express.Router()
const authjwt = require("../middlewares/authjwt")
const validateAddressReqBody = require("../middlewares/validateAddressReqBody")

addressRouter.post("/", [authjwt.verifyToken, validateAddressReqBody.validateAddressReqBody], addressController.createAddress)

module.exports = addressRouter