const express = require("express")
const orderController = require("../controllers/order.controller")
const orderRoute = express.Router()
const authjwt = require("../middlewares/authjwt")

// The following API endpoints must be implemented in the 'Order Controller' class:
// Create Order - '/orders'
orderRoute.post("", [authjwt.verifyToken, authjwt.verifyUser], orderController.placeOrder)

module.exports = orderRoute