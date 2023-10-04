const orderModel = require("../models/order.model")
const addressModel = require("../models/address.model")
const productModel = require("../models/product.model")
const userModel = require("../models/user.model")

exports.placeOrder = async(req, res)=>{
    try{
        const product = await productModel.findOne({productId:req.body.productId})

        if(!product){
            return res.status(400).json({
                errMessage: `No Product found for ID - ${req.body.productId}!`
            })
        }

        const address = await addressModel.findOne({addressId:req.body.addressId})
        
        if(!address){
            return res.status(400).json({
                errMessage: `No Address found for ID - ${req.body.addressId}!`
            })
        }
        
        if(product.availableItems<=0){
            return res.status(200).json({
                errMessage: `Product with ID - ${req.body.productId} is currently out of stock!`
            })
        }

        if(req.body.quantity>product.availableItems){
            return res.status(400).json({
                errMessage: `Available quantity is less than the required`
            })
        }

        const user = await userModel.findOne({email:req.email})

        const order = {
            productId: product.productId,
            shippingAddressId: address.addressId,
            amount: req.body.quantity*product.price,
            userId: user.userId
        }
 
        const lastOrder = await orderModel.find({},{_id:0, orderId:1}).sort({_id:-1}).limit(1)

        if(lastOrder.length==0){
            order.orderId = 1
        }
        else{
            order.orderId = ++lastOrder[0].orderId
        }

        const createdOrder = await orderModel.create(order)

        const newAvailableItems = product.availableItems-req.body.quantity

        const result = await productModel.updateOne({productId:product.productId},{$set:{availableItems:newAvailableItems}})

        return res.status(200).json({
            data: createdOrder,
            message: "Order Placed Successfully"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            errMessage: "Internal Server Error"
        })
    }
}