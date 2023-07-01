const express = require("express");

const { Cartmodel } = require("../models/CartModel");

const { authenticate } = require("../middlewares/authentication");

const cartrouter = express.Router();

cartrouter.get("/",authenticate, async (req, res) => {
  let userID=req.body.userID
  // console.log(userID);
    try {
        const cart_data = await Cartmodel.findOne({userID}).populate("cart.prodId").exec();
        // console.log(cart_data);
        res.json({ "msg": cart_data })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while getting the cart Details" })
    }
})



cartrouter.post("/postcart", authenticate, async (req, res) => {
  const id = req.body.id;
  const userID = req.body.userID;
  try {
    let find_user = await Cartmodel.findOne({ userID });
    console.log(find_user,"deven");
    if (find_user) {
      const existingProductIndex = find_user.cart.findIndex(
        (item) => item.prodId.toString() === id.toString()
      );


      if (existingProductIndex !== -1) {
        // Update the quantity if prodId matches
        find_user.cart[existingProductIndex].quantity += 1;
      } else {
        // Add a new product to the cart
        find_user.cart.push({ prodId: id, quantity: 1 });
      }

      // Save the updated cart
      await find_user.save();
    } else {
      let cart_data = new Cartmodel({ userID, cart: [{ prodId: id, quantity: 1 }] });
      await cart_data.save();
    }
    

    res.json({ msg: "Successfully added the data to the cart" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error while posting to the cart" });
  }
});



cartrouter.patch("/UpdateCartProducts/:id", authenticate, async (req, res) => {
    const id = req.params.id;
    const userID = req.body.userID;
  
    try {
      let find_user = await Cartmodel.findOne({ userID });
      console.log(find_user);
  
      if (find_user) {
        const existingProductIndex = find_user.cart.findIndex(
          (item) => item.prodId.toString() === id.toString()
        );
  
        if (existingProductIndex !== -1) {
          // Update the quantity if prodId matches
          find_user.cart[existingProductIndex].quantity -= 1;
  
          if (find_user.cart[existingProductIndex].quantity <= 0) {
            // Remove the product from the cart if quantity becomes zero or less
            find_user.cart.splice(existingProductIndex, 1);
          }
        }
        
  
        // Save the updated cart
        await find_user.save();
      }
  
      res.json({ "msg": "Successfully removed from the Cart" });
    } catch (error) {
      console.log(error);
      res.json({ "msg": "Error while Updating the Product" });
    }
  });
  


cartrouter.delete("/DeleteCartProducts/:id", authenticate, async (req, res) => {

    const id = req.params.id;


    const userID = req.body.userID

    try {
        const user_data = await Cartmodel.findOneAndUpdate({ userID }, { $pull: { cart: id } })

        res.json({ "msg": "Successfully Deleted the Cart products" })

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while Deleting the Product" })
    }

})



module.exports = {
    cartrouter
}