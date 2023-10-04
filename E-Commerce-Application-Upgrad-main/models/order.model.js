const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    orderDate : {
        type : Date,
        immutable  : true,
        default : ()=>{
            return Date.now();
        }
    },
    productId : {
        type : String,
        required : true
    },
    shippingAddressId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("orders", orderSchema)