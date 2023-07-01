const mongoose = require("mongoose")




const productSchema = mongoose.Schema({
    seller_id:{type:String,required:true},
    image: { type: String, required: false },
    name: { type: String, required: false },
    rating: { type: Number, required: false },
    price: { type: Number, required: false },
    type: { type: String, require: false },
    brand: { type: String, require: false },
    flavors: { type: String, require: false },
    sizes: { type: String, require: false },
    quantity:{type:Number, required:false}

})


const Productmodel = mongoose.model("products", productSchema)


module.exports = {

    Productmodel
}