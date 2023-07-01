const express = require('express');

const paymentRouter = express.Router();


const Razorpay = require("razorpay");

paymentRouter.use(express.json())

var instance = new Razorpay({
    key_id: 'rzp_test_rN9fKC3IkvjvAS',
    key_secret: 'LejbrZJMMXp6RF3aBI68znnP',
});

paymentRouter.post("/create/orderId", (req, res) => {
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        res.json({ orderId: order.id })
    });
})

paymentRouter.post("/api/payment/verify", (req, res) => {
    var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
    validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

    if (generated_signature == razorpay_signature) {
        res.json("payment is successful")
    }
})

// paymentRouter.post("/payment", async (req, res) => {

//     let { amount } = req.body;

//     var instance = new Razorpay({
//         key_id: 'rzp_test_rN9fKC3IkvjvAS',
//         key_secret: 'LejbrZJMMXp6RF3aBI68znnP',
//     });
//     let order = await instance.orders.create({
//         amount: amount * 100,
//         currency: "INR",
//         receipt: "receipt#1"
//     })

//     res.status(201).json({ 
//         success: true,
//         order,
//         amount,
//     })



// })

module.exports = {
    paymentRouter
}
