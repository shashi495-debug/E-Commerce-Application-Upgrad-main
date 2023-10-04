const productModel = require("../models/product.model")

exports.fetchProducts = async(req, res)=>{
    
    try{
        let dir = {DESC:-1, ASC:1}
        let category = {$regex: '^[a-zA-Z]*'}
        let direction = dir["DESC"]
        let key = "productId"
        let pageNo = 0
        let pageSize = 0

        if(req.query.category){
            category = req.query.category
        }

        if(req.query.direction){
            direction = dir[req.query.direction]
        }

        if(req.query.pageNo){
        pageNo = req.query.pageNo 
        }

        if(req.query.pageSize){
            pageSize = req.query.pageSize 
        }
        
        if(req.query.sortBy){
            key = req.query.sortBy
        }
        let result = ""
        if(req.query.name){
            result = await productModel.find({name:req.query.name})
        }

        else{
            const sortBy = {[key]: direction}
            console.log(sortBy)
            result = await productModel.find({category:category}).sort(sortBy).skip(pageNo*pageSize).limit(pageSize) 
        }

        return res.status(200).json({
            data: result
        })
    }
    catch(err){
        return res.status(500).json({
            error: "Internal Error"
        })
    }
}

exports.fetchCategories = async(req, res)=>{

    try{
        const result = await productModel.find({},{_id:0, category:1})
        const responseObject = []
        result.forEach((doc)=>{
            responseObject.push(doc.category)
        })

        return res.status(200).json(responseObject)
    } 
    catch(err){
        return res.status(500).json({
            error: "Internal Error"
        })
    }

}

exports.fetchById = async(req, res)=>{

    try{
        const result = await productModel.find({productId: req.params.id},{_id:0, __v:0})
        
        if(result.length===0){
            return res.status(400).send({message:`No Product found for ID - ${req.params.id}!`})
        }

        return res.status(200).json(result)
    } 
    
    catch(err){
        return res.status(500).json({
            error: "Internal Error"
        })
    }
}

exports.addProduct = async(req, res) => {
    try{
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageUrl: req.body.imageUrl
        }

        const lastProduct = await productModel.find({},{_id:0, productId:1}).sort({_id:-1}).limit(1)

        if(lastProduct.length==0){
            product.productId = 1
        }
        else{
            product.productId = ++lastProduct[0].productId
        }

        const productCreated = await productModel.create(product)

        return res.status(200).send({
            data: productCreated,
            message: "product added Successfully"
        })
    }

    catch(err){
        console.log(err)
        return res.status(500).send({
            err:"Internal Error"
        })
    }
}

exports.updateProduct = async(req, res) => {
    try{
        const productUpdated = await productModel.findOneAndUpdate({productId:req.params.id},{$set:req.body})
        if(!productUpdated){
            return res.status(400).send(`No Product found for ID - ${req.params.id}!`)
        }

        const response = await productModel.find({productId:req.params.id},{_id:0,__v:0})

        return res.status(200).send({
            data: response,
            message: "product updated Successfully"
        })
    }

    catch(err){
        console.log(err)
        return res.status(500).send({
            err:"Internal Error"
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try{

        const result = await productModel.findOneAndDelete({productId:req.params.id})
        if(!result){
            return res.status(400).send(`No Product found for ID - ${req.params.id}!`)
        }

        return res.status(200).send({
            message: `Product with ID - ${req.params.id} deleted successfully!`
        })
    }

    catch(err){
        console.log(err)
        return res.status(500).send({
            err:"Internal Error"
        })
    }
}

