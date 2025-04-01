const wishList = require('./../db/wishlist');
const mongoose = require('mongoose');




async function addWishlist(userId,productId)
{
    const wishlist = new wishList({
        userId : userId,
        productId : productId,
    });
    await wishlist.save();
    return wishlist.toObject();
}

async function removeWishlist(productId)
{
    await wishList.deleteOne({
       
        productId
    })
    return { message: "Deleted Successfully" };

}

async function getWishlist(userId)
{
    const wishlist = await wishList.find({
        userId:userId
    }).populate('productId');
   

    return wishlist.map((res)=> res.toObject().productId);    

}

module.exports = {getWishlist,removeWishlist,addWishlist}