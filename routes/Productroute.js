const express = require("express");
const { Productmodel } = require("../models/ProductModel");
const productRouter = express.Router();

const { authenticate } = require("../middlewares/authentication");

const { authorise } = require("../middlewares/authorization");


productRouter.get("/", async (req, res) => {

    try {
        const find_product = await Productmodel.find();

        res.json({ "msg": find_product })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Getting the Product" })
    }
 
})

productRouter.get("/seller",authenticate,authorise(["Seller"]), async (req, res) => {
let userID=req.body.userID
    try {
        const find_product = await Productmodel.find({seller_id:  userID});

        res.json({ "msg": find_product })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Getting the Product" })
    }

})

productRouter.post("/addProducts", authenticate, authorise(["Seller"]), async (req, res) => {
    const payload = req.body;
    req.body.seller_id = req.body.userID;
    try {
        const new_product = await Productmodel(payload);
        await new_product.save();
        res.json({ "msg": "Created the new product" })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Posting the Product" })
    }

})

productRouter.patch("/EditProducts/:id", authenticate, authorise(["Seller"]), async (req, res) => {
    const payload = req.body;
    const id=req.params.id;
    const product=await Productmodel.find({_id:id});
    const seller_id=product[0].seller_id;
    const user_id=req.body.userID;
    
    try {
        if(seller_id==user_id){
            const update_product=await Productmodel.findByIdAndUpdate({"_id":id},payload);
            res.json({"msg":"Successfully Updated the product"})
        }
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Updating the Product" })
    }

})

productRouter.delete("/DeleteProducts/:id", authenticate, authorise(["Seller"]), async (req, res) => {
    
    const id=req.params.id;
    const product=await Productmodel.find({_id:id});
    const seller_id=product[0].seller_id;
    const user_id=req.body.userID;
    
    try {
        if(seller_id==user_id){
            const update_product=await Productmodel.findByIdAndDelete({"_id":id});
            res.json({"msg":"Successfully Deleted the product"})
        }
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Deleting the Product" })
    }

})


productRouter.get("/filter",async(req,res)=>{
    const query=req.query.value
    
    let store=query.toLowerCase();

    try {
        let filt_data=await Productmodel.find({sizes:store});
        res.json({"msg":filt_data})
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while filtering the data"})
    }


})


productRouter.get("/sort",async(req,res)=>{
    const query=req.query.value
    
    try {
        if(query=="asc"){
            let sort_data=await Productmodel.find().sort({price:1})
            res.json({"msg":sort_data})
        }else if(query=="desc"){
            let sort_data=await Productmodel.find().sort({price:-1})
            res.json({"msg":sort_data})
        }
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while filtering the data"})
    }
})


// productRouter.get("/search",async(req,res)=>{
//     const query=req.query.value
//     console.log(query);
//     try {
//         let store=query.toLowerCase();
//         let search_data=await Productmodel.find({name:query});
//         res.json({"msg":search_data});  
//     } catch (error) {
//         console.log(error);
//         res.json({"msg":"Error while filtering the data"})
//     }
// })

module.exports = {
    productRouter
}

// {
//     "image":"https://via.placeholder.com/350x250",
//     "name":"HoneyButter",
//     "rating":4.5,
//     "price":100,
//     "type":"popular",
//     "brand":"rosy",
//     "flavors":"HoneyLike",
//     "sizes":"small"
    
    
//   }
  

