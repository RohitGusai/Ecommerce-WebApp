const Order = require('../db/order');

async function addOrderData(userId,order)
{
    let orders = await Order({
        ...order,
        userId : userId,
        status : "inProgress"
    })
    console.log("Saving Order to MongoDB:", orders);
    await orders.save();
    // return orders.toObject();
}

async function getOrder(userId)
{
    let orders = await Order.find({userId : userId})
    return orders.map((x)=> x.toObject());
}

async function getOrdersDetail()
{
    let orders = await Order.find()
    return orders.map((x)=> x.toObject());
}

async function getOrdersUpdate(id,status)
{

    await Order.findByIdAndUpdate(id,{
        status :status
    })
 
}



module.exports = {addOrderData,getOrder,getOrdersDetail,getOrdersUpdate}