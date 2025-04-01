const jwt = require("jsonwebtoken");

function VerifyUser(req,res,next)
{
    const token = req.header("Authorization");
    console.log("this is token",token)
    if(!token)
    {
        return res.status(401).send({
            message : "Access Denied"
        })  
    }
    try {
        const decode = jwt.verify(token,"seceret");
        console.log("This is after decoding",decode);
        req.user = decode;
        console.log("checking User data after decryption",req.user);
        next();
    } catch (error) {
        return res.status(401).send({
            error : "Invalid Token"
        })
    }
}

function isAdmin(req,res,next)
{
    if(req.user && req.user.isAdmin)
    {
        next();
    }
    else
    {
        return res.status(401).send({
            message : "Forbidden"
        })
    }
}
module.exports = {VerifyUser,isAdmin}