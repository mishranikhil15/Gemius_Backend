const mongoose = require("mongoose")




const paymentSchema = mongoose.Schema({
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    paymentMethodId: { type: String, required: true }

})


const Paymentmodel = mongoose.model("payment", paymentSchema)


module.exports = {
Paymentmodel
}