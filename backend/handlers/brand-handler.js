const Brand = require("./../db/brands");


async function getBrands()
{
    let Brands = await Brand.find();
    return Brands.map((ct) => ct.toObject());
}

async function getBrandsById(id)
{
    let Brands = await Brand.findById(id);
    return (Brands.toObject());
}

async function addBrands(model)
{
    
    let Brands = new Brand({name : model.name});
    await Brands.save();
    return ({message : "Brand Added Successfully"})
}

async function updateBrands(id,model)
{
    let Brands = await Brand.findOneAndUpdate({_id : id},model);
    return ({message : "Brand Updated Successfully"});;
}

async function deleteBrands(id)
{
    let Brands = await Brand.findByIdAndDelete(id);
    return ({message : "Brand Deleted Successfully"});
}

module.exports = {deleteBrands,updateBrands,getBrandsById,getBrands,addBrands}