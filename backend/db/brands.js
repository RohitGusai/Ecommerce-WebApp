const mongoose = require("mongoose");
const BrandSchema = mongoose.Schema({
    name : String,
});

const Brand = mongoose.model("Brands",BrandSchema);
module.exports  = Brand;