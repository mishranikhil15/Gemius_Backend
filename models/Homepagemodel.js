const mongoose = require("mongoose")




const homeSchema = mongoose.Schema({
    image: { type: String, required: false },
    name: { type: String, required: false },
    type:{type:String,require:false}
})


const Homemodel = mongoose.model("home", homeSchema)


module.exports = {

    Homemodel
}