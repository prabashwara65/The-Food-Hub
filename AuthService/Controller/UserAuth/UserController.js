require("dotenv").config();
const UserModel = require("../../Model/UserAuth/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN, { expiresIn: "3d" });
};

const RegisterUser = async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    const user = await UserModel.Register(
      name,
      email,
      password,
      phoneNumber,
      role
    );

    //Create Token
    const token = createToken(user._id);

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
    const token = createToken(user._id);

    //Set cookies
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetUserCounts = async (req, res) => {
  try {
    const customerCount = await UserModel.countDocuments({ role: "customer" });
    const ownerCount = await UserModel.countDocuments({ role: "owner" });
    const deliveryCount = await UserModel.countDocuments({ role: "delivery" });

    res.status(200).json({
      customers: customerCount,
      owners: ownerCount,
      deliveryPersons: deliveryCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user counts" });
  }
};

const GetUsersByRole = async (req, res) => {
  const { role } = req.query || {};

  if (!role) {
    return res
      .status(400)
      .json({ message: "Missing 'role' in query parameters" });
  }

  try {
    const users = await UserModel.find({ role }).select("-password"); //Get user details instead of password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  GetUserCounts,
  GetUsersByRole,
  UpdateUser,
  DeleteUser,
};
