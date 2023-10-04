const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { urlencoded } = require("express")

exports.validateUserReqBody = async(req, res, next)=>{

    // If the email ID provided by the user is not in the correct format, i.e., not in the format of <part1>@<part2>.<part3>, return the JSON response 'Invalid email-id format!' with the corresponding HTTP status.
    // Here, part 1 and part 2 should have at least one character whereas part 3 can have at least 2 characters and at most 6 characters.
    // Part 1 and part 2 can contain the following characters a-z, A-Z, 0-9, .(dot), _, -.
    // Lastly, Part 3 can contain the following characters:a-z
    console.log(req.body)
    
    if(!/^([a-zA-Z0-9/.])+\@([a-zA-Z0-9]+\.)+([a-z]{2,6})+$/.test(req.body.email)){
        return res.status(400).send("Invalid EmailId")
    }

    // If the email provided by the user already exists in the current database, return the JSON response 'Try any other email, this email is already registered!' with the corresponding HTTP status.
    const user = await userModel.find({email:req.body.email})
    console.log(user)
    if(user.length!=0){
        return res.status(400).send("emailId already exists")
    }

    // If the contact number provided by the user is not in the correct format, i.e., it does not contain only numbers or has more or less than 10 digits, returns the JSON response 'Invalid contact number!' with the corresponding HTTP status.
    if(!/^([1-9]{1}[0-9]{9})$/.test(req.body.contactNumber)){
        return res.status(400).send("Invalid contactNumber")
    }

    // If the contact number already exists
    const contactNumber = await userModel.findOne({contactNumber:req.body.contactNumber})
    if(contactNumber){
        return res.status(400).send("contactNumber already exists")
    }
   
    next()

}

exports.validateSignInReq = async(req, res, next)=>{
// If the email entered by the user does not exist, return the JSON response 'This email has not been registered!' with the corresponding HTTP status.

// If the password provided by the user does not match the credentials in the existing database, return the JSON response 'Invalid Credentials!' with the corresponding HTTP status.
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("Email doesnot Exist")
    }
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordValid){
        return res.status(400).send("Password doesnot match")
    }

    req.user = user
    
    next()
}

