const addressModel = require("../models/address.model")
const userModel = require("../models/user.model")

exports.createAddress = async (req, res)=>{
    try{
        const address = {
            name: req.body.name,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            contactNumber: req.body.contactNumber,
            state: req.body.state,
            zipCode: req.body.zipCode
        }

        const user = await userModel.findOne({email:req.email})
        address.userId = user.userId
        
        const lastAddress = await addressModel.find({},{_id:0, addressId:1}).sort({_id:-1}).limit(1)

        if(lastAddress.length==0){
            address.addressId = "AD"+new Date().getFullYear()+"Id"+1
        }
        else{
            str = lastAddress[0].addressId
            count = str.split("Id")[1]
            console.log(count)
            address.addressId = "AD"+new Date().getFullYear()+"Id"+(++count)
        }

        const addressCreated = await addressModel.create(address)

        responseObject = {
            _id: addressCreated.addressId,
            name: addressCreated.name,
            street: addressCreated.street,
            landmark: addressCreated.landmark,
            city: addressCreated.city,
            contactNumber: addressCreated.contactNumber,
            state: addressCreated.state,
            zipCode: addressCreated.zipCode,
            createdAt: addressCreated.createdAt,
            updatedAt: addressCreated.updatedAt,
            user: user
        }
        console.log(responseObject)

        return res.status(200).send({
            data: responseObject,
            message: "address added Successfully"
        })
    }

    catch(err){
        console.log(err)
        return res.status(500).send({
            err:err
        })
    }
}