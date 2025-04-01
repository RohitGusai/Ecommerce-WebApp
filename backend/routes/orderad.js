const express = require("express")
const router = express.Router();

const {getOrdersDetail,getOrdersUpdate} = require("../handlers/order-handler")


router.get("",async function(req,res)
{
    let order = await getOrdersDetail();
    res.send(order);
})

router.post("/:id",async function(req,res)
{
    let id =  req.params.id;
    let status = req.body.status
    await getOrdersUpdate(id,status);
    res.send({ message:"updated successfully"})
})

module.exports = router;