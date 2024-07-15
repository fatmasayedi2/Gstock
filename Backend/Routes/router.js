const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const UserModel = require("../Models/user");



router.post("/register", async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser); 
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message }); 
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({}); 
        res.status(200).json(users); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
});


router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId); 
        res.status(200).json(deletedUser); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await UserModel.findOne({ email: email });

        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Si l'utilisateur et le mot de passe sont corrects, renvoyez un message de succès
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;
  

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode, ProductQuantity })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode, ProductQuantity }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})

// Rechercher un produit par nom
router.get('/products/search/:name', async (req, res) => {
    const productName = req.params.name;
    try {
        const getProductByName = await products.find({ ProductName: { $regex: productName, $options: 'i' } });
        console.log(getProductByName);
        res.status(200).json(getProductByName);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})






module.exports = router;