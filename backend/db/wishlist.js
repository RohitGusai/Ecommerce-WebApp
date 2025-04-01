const mongoose = require("mongoose");
const { Schema } = mongoose; 


const wishlistSchema = mongoose.Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'users'},
    productId : {type : Schema.Types.ObjectId, ref : 'Products' }
})

const wishList = mongoose.model('wishlists',wishlistSchema)

module.exports = wishList;