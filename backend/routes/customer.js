const express = require("express");
const router = express.Router();

const {getProductsId,getProductForList, getFeatures,getNewProduct } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getBrands } = require("../handlers/brand-handler");
const {getWishlist,removeWishlist,addWishlist} = require("../handlers/wishlist-handler");
const {getCarts,removeCart,addToCart,clearCart} = require("../handlers/cart-handler");
const { addOrderData,getOrder } = require("../handlers/order-handler");



router.get("/home/new-product/",async function(req,res)
{
    const newcustomerchoice = await getNewProduct();
    res.send(newcustomerchoice)
})

router.get("/home/featured-product/",async function(req,res)
{
    const featurescustomerchoice = await getFeatures();
    res.send(featurescustomerchoice);
})

router.get("/category",async function(req,res)
{
    const category = await getCategories();
    res.send(category);
}) 

router.get("/products",async function(req,res)
{
    const {searchTerm,categoryId,brandId,page,pageSize,sortBy,sortOrder} = req.query;
    const products = await getProductForList(searchTerm,categoryId,brandId,page,pageSize,sortBy,sortOrder);
    res.send(products)
})

router.get("/brand", async function(req,res)
{
    const brands = await getBrands();
    res.send(brands)
})

router.get("/product/:id", async (req, res) => {
    try {
        let id = req.params["id"];
        let product = await getProductsId(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product", details: error.message });
    }
});

router.get("/wishlist", async (req, res) => {
    try {
        // console.log("User data:", req.user);  // Debugging user data
        let id = req.user.id;
        const wishlist = await getWishlist(id);
        console.log("Wishlist data:", wishlist);  // Debugging populated wishlist
        res.send(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Error fetching wishlist", details: error.message });
    }
});


router.post("/wishlist/:id", async (req,res)=>
    {
        console.log("user",req.user.id);
    //    res.send(req.user)
        let userid= req.user.id;
        let productid = req.params.id;
        console.log(productid);
        const wishlist = await addWishlist(userid,productid);

        res.send(wishlist);
    })

    router.delete("/wishlist/:id", async (req,res)=>
        {
            // console.log(req.user);
            //res.send(req.user)
            // let userid= req.user.id;
            let productid = req.params.id;
            const wishlist = await removeWishlist(productid);
            res.send(wishlist);
        })


router.get("/cart",async function(req,res)
{
    const userId = req.user.id;
    res.send(await getCarts(userId));
})

router.post("/cart/:id",async function(req,res)
{
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const result = await addToCart(userId, productId, quantity);
    console.log(result);
    res.status(200).json(result);
})

router.delete("/cart/:id",async function(req,res)
{
    const userId = req.user.id;
    const productId = req.params.id;

    res.send(await removeCart(userId,productId));
})


router.post("/order",async function(req,res)
{
    const userId = req.user.id
    const order = req.body

    console.log("Received Order:", order);
    await addOrderData(userId,order)
    await clearCart(userId)

    res.send({message : "Order Added Successfully"})
    
})

router.get("/order",async function(req,res)
{
    const userId = req.user.id

   let order =  await getOrder(userId)
   res.send(order);
})



module.exports = router;