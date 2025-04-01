const Cart = require('.././db/cart');

async function addToCart(userId, productId, quantity) {
    try {
        console.log("Adding to cart - User ID:", userId, "Product ID:", productId, "Quantity:", quantity);

        let product = await Cart.findOne({ userId: userId, productId: productId });

        if (product) {
            console.log("Product already in cart, updating quantity...");
            product.quantity += quantity;
            await product.save();
            console.log("Updated product quantity:", product.quantity);
        } else {
            console.log("Product not in cart, adding new item...");
            product = new Cart({
                userId: userId,
                productId: productId,
                quantity: quantity,
            });
            await product.save();
            console.log("New cart entry created:", product);
        }

        return product.toObject();
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error; // Propagate the error for API response
    }
}




async function removeCart(userId,productId)
{
    await Cart.findOneAndDelete({userId:userId,productId : productId})
    return {message : "Remove from the Cart"}

}

async function getCarts(userId)
{
    const product = await Cart.find({userId:userId}).populate("productId");
    
    return product.map((x)=>
        {
           return { quantity : x.quantity, product : x.productId}
        } )
}

async function clearCart(userId)
{
    await Cart.deleteMany({userId : userId})
    return {message : "Delted Successfully"};
}

module.exports = {getCarts,removeCart,addToCart,clearCart};