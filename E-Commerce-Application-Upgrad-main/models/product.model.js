const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        unique : true,
        required : true
    },
    availableItems : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    imageUrl : {
        type : String
    },
    manufacturer : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("products", productSchema)