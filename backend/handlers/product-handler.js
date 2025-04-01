const Product = require("./../db/product")
const mongoose = require('mongoose');

async function addProducts(model) {
    try {
        let product = new Product({ ...model });
        await product.save(); 
        return product.toObject();
    } catch (error) {
        throw new Error("Error saving product: " + error.message);
    }
}

async function updateProducts(id, model) {
    const product = await Product.findByIdAndUpdate(id, model, { new: true });
    return product ? product.toObject() : null;
}


async function deleteProducts(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return null;
    return { message: "Deleted Successfully" };
}


async function getProducts()
{
    const product = await Product.find();
    return product.map((ct)=> ct.toObject());
}

async function getProductsId(id)
{
    const product = await Product.findById(id);
    return product.toObject();
}

async function getNewProduct()
{
    const product = await Product.find({
        isNewProduct : true
    })
    return product.map(ct => ct.toObject());
}

async function getFeatures()
{
    const product = await Product.find({
        isFeatures : true
    })
    return product.map(ct => ct.toObject());
}

async function getProductForList(searchTerm,categoryId,brandId,page,pageSize,sortBy,sortOrder)
{
    if(!sortBy)
    {
        sortBy = "price"
    }
    if(!sortOrder || isNaN(sortOrder))
    {
        sortOrder = -1;
    }
    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or =[ 
           {
            name : { $regex: ".*" + searchTerm + ".*", $options: "i" }
            },
            {
                shortDescription : { $regex: ".*" + searchTerm + ".*", $options: "i" }
            },
        ];
    }    
    if (categoryId && categoryId !== "-1" && mongoose.Types.ObjectId.isValid(categoryId)) {
        queryFilter.categoryId = new mongoose.Types.ObjectId(categoryId);
    } else {
        console.log("Invalid categoryId:", categoryId);
    }
    
    if (brandId && brandId !== "-1" && mongoose.Types.ObjectId.isValid(brandId)) {
        queryFilter.brandId = new mongoose.Types.ObjectId(brandId);
    } else {
        console.log("Invalid brandId:", brandId);
    }
    
    console.log("QueryList",queryFilter.sortBy)
    console.log("QueryList",queryFilter.sortOrder)
    const products = await Product.find(queryFilter).sort({
        [sortBy]: +sortOrder,
    })
    .skip((+page-1) * +pageSize)
    .limit(+pageSize);
    return products.map((x)=>x.toObject());
}




module.exports = {getProductForList,getProducts,getProductsId,deleteProducts,updateProducts,addProducts,getFeatures,getNewProduct};