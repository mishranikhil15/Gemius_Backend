
const jwt=require('jsonwebtoken');

const authorise=(role_array)=>{
    return(req,res,next)=>{
        const userrole=req.body.role
        if(role_array.includes(userrole)){
            next()
        }else{
            res.json({"msg":"You are not authorized"})
        }
    }
}

module.exports={
    authorise
}