require("dotenv").config()
const UserModel = require("../../Model/UserAuth/UserModel");
const jwt = require("jsonwebtoken");



const createToken = (_id) => {
    return jwt.sign({_id } , process.env.TOKEN , {expiresIn: '3d'})
}

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.Register(name, email, password);

    //Create Token
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.Login(email, password);

      //Create Token
      const token = createToken(user._id )

       //Set cookies 
      res.cookie('token' , token , { httpOnly : true })

    res.status(200).json( {user} );
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
