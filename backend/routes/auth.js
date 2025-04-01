const express = require("express");
const router = express.Router();
const  { addUser,checklogin } = require ("../handlers/auth-handler");

router.post("/register",async function (req,res) {
    let model = req.body;
    if(model.name && model.email && model.password)
    {
       await addUser(model); 
       res.send({
        message : "User Register",
       });
    }
    else
    {
        res.status(400).json({
            error : "please Provide name , email and password",
        })
    }
   
})

router.post("/login", async function(req,res)
{
    let model = req.body;
    if( model.email && model.password)
    {
       const result = await checklogin(model); 
       if(result)
       {
        res.send(result);
       }
       else
       {
           res.send({
               message : "name and Password is incorrect",
              });
       }
    }
    else
    {
        res.status(400).json({
            error : "please Provide email and password",
        })
    }
})

module.exports = router;