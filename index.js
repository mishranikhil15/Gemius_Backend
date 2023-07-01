const express = require('express');
const { connection } = require("./config/db");
const { userrouter } = require("./routes/userroute")
const { paymentRouter } = require("./routes/Paymentroute");
const { homerouter } = require("./routes/Homeroute");
const { productRouter } = require("./routes/Productroute");

const { cartrouter}= require("./routes/cartroute");
const {categoryRouter}=require("./routes/Categoryroute")

const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome")
})



app.use("/home", homerouter);
app.use("/users", userrouter);
app.use("/category",categoryRouter);
app.use("/products", productRouter);
app.use("/cart", cartrouter);
app.use("/payments", paymentRouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Connected to Db');
        console.log(`Server is running on port ${process.env.port}`)
    } catch (error) {
        console.log("Trouble while connecting to Db");
    }
}) 