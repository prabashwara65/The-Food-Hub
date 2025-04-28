const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Using bcryptjs instead of bcrypt
const validator = require("validator");

const Schema = mongoose.Schema;

const UserRegistrationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create registration statics function
UserRegistrationSchema.statics.Register = async function (
  name,
  email,
  password,
  phoneNumber,
  role
) {
  const exit = await this.findOne({ email });

  if (exit) {
    throw Error("Email Already in use");
  }

  // bcryptjs does not require "genSalt" for salt generation
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt); // Use bcryptjs's hash method

  const user = await this.create({
    name,
    email,
    password: hash,
    phoneNumber,
    role,
  });

  return user;
};

// Create login static function
UserRegistrationSchema.statics.Login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  // Use bcryptjs's compare method for password verification
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", UserRegistrationSchema);
