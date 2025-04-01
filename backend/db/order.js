const mongoose = require("mongoose");
const { Schema } = mongoose; 
const orderSchema = mongoose.Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'users'},
    date : Date,
    items : Array(mongoose.Schema.Types.Mixed),
    paymentType : String,
    address : mongoose.Schema.Types.Mixed,
    status : String
});

const order = mongoose.model("orders",orderSchema);
module.exports  = order;