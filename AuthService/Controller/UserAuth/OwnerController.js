const jwt = require("jsonwebtoken");
const OwnerModel = require("../../Model/UserAuth/OwnerModel");
const CounterModel = require('../../Model/UserAuth/CounterModel')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//owner register
const RegisterOwner = async (req, res) => {
  const { name, ownerEmail, password } = req.body;

  try {
    const owner = await OwnerModel.Register(name, ownerEmail, password);

    const token = createToken(owner._id);

    const ownerData = {
      ownerId: owner.ownerId,
      name: owner.name,
      ownerEmail: owner.ownerEmail,
    };
    
    res.status(200).json({ owner, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//owner login
const LoginOwner = async (req, res) => {
  const { ownerEmail, password } = req.body;

  try {
    const owner = await OwnerModel.Login(ownerEmail, password);
    const token = createToken(owner._id);

    // Only send safe owner fields
    const ownerData = {
      ownerId: owner.ownerId,
      name: owner.name,
      ownerEmail: owner.ownerEmail,
    };

    res.status(200).json({ owner, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  RegisterOwner,
  LoginOwner,
};
