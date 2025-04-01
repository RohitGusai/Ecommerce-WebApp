const mongoose = require("mongoose");
const { Schema } = mongoose; 
const productSchema = mongoose.Schema({
    name : String,
    shortDescription : String,
    description : String,
    price : Number,
    discount : Number,
    images: [String],
    categoryId : {type : Schema.Types.ObjectId, ref : 'Category'},
    brandId : {type : Schema.Types.ObjectId, ref : 'Brand'},
    isFeatures : Boolean,
    isNewProduct : Boolean
});

const Product = mongoose.model("Products",productSchema);
module.exports  = Product;