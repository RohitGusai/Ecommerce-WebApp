const Users = require("./../db/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function addUser(model)
{
    const hashpassword = await bcrypt.hash(model.password,10);
    let user = new Users({
        name : model.name,
        email : model.email,
        password  : hashpassword
    })
    await user.save();
    return ({message : "User Added Successfully"})
}

async function checklogin(model)
{
    const user = await Users.findOne({email:model.email})
    if(!user)
    {
        return null;
    }
    console.log(user,model.password,user.password)
    const isMatch = await bcrypt.compare(model.password,user.password)
    if(isMatch)
    {
        const token = jwt.sign({
            id : user._id,
            name : user.name,
            email : user.email,
            isAdmin: user.isAdmin
        },"seceret",
    {
        expiresIn : "1h",
    });
    return {token,user}
    }
    else
    {
        return null;
    }

}

module.exports = {addUser, checklogin}