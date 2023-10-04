const addressModel = require("../models/address.model")

exports.validateAddressReqBody = (req, res, next)=>{
    
    // If the zip code provided by the user is not in the correct format, i.e., it does not contain only numbers and its length is more or less than six digits), return the JSON response 'Invalid zip code!' with the corresponding HTTP status.
    const zipCode = /^[0-9]{6}$/
    if(!zipCode.test(req.body.zipCode)){
        return res.status(401).json({
            errMessage:"Invalid zipCode"
        })
    }

    // If the contact number provided by the user is not in the correct format, i.e., it does not contain only numbers or has more or less than 10 digits, returns the JSON response 'Invalid contact number!' with the corresponding HTTP status.
    if(!/^([1-9]{1}[0-9]{9})$/.test(req.body.contactNumber)){
        return res.status(400).json({message:"Invalid contactNumber"})
    }

    next()
}