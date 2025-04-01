const mongoose = require('mongoose');
const { Schema } = mongoose; 

const cartSchema = mongoose.Schema({
    userId : {type : Schema.Types.ObjectId, ref:'users'},
    productId : {type : Schema.Types.ObjectId, ref:'Products'},
    quantity : Number
})

const cart = mongoose.model('cart',cartSchema);
module.exports = cart;