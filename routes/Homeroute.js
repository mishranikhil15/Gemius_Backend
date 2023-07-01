const express=require('express');
const {Homemodel}=require("../models/Homepagemodel")

const homerouter=express.Router();


homerouter.get("/",async(req,res)=>{

    try {
        const data=Homemodel.find();
        res.json({"msg":data});
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while Posting the data"})
    }
})

homerouter.post("/data",async(req,res)=>{
    const payload=req.body;
    try {
        const data=new Homemodel({payload});
        await data.save();
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while Posting the data"})
    }
})

module.exports={
    homerouter
}

