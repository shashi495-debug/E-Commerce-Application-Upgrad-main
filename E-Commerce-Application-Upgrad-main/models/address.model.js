const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    addressId : {
        type : String,
        required : true,
        unique : true
    },
    city : {
        type : String,
        required : true
    },
    landmark : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    contactNumber :{
        type : String,
        required : true,
    },
    street : {
        type : String,
        required : true
    },
    zipCode : {
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

module.exports = mongoose.model("addresses", addressSchema)