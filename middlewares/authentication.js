const jwt=require('jsonwebtoken');
require('dotenv').config();

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token);
    try {
        if(token){
            const decoded=jwt.verify(token,process.env.key);
            const userID=decoded.userID;
            const role=decoded.role;
            if(decoded){
                req.body.userID=userID;
                req.body.role=role;
                next();
            }else{
                res.json({"msg":"Please Login First"})
            }
        }else{
            res.json({"msg":"Token not present,Please Login First"})
        }
    } catch (error) {
        console.log("nik",error.message);
        res.json({"msg":error.message})
    }
}

module.exports={
    authenticate
}