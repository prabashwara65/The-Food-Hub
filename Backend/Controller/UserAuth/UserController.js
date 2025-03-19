const UserModel = require('../../Model/UserAuth/UserModel')

const RegisterUser = async (req , res) => {
    const {name , email , password} = req.body;

    try{
        const user = await UserModel.RegisterUser( name , email , password )
        res.status(200).json({email , user})

    }catch(error){
        console.log({error: error.message})
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    RegisterUser
}