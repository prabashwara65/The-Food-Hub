const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Counter = require("./CounterModel");

const Schema = mongoose.Schema;

const OwnerSchema = new Schema(
  {
    ownerId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

OwnerSchema.statics.Register = async function (name, ownerEmail, password) {
  if (!name || !ownerEmail || !password) {
    throw Error("Required fields missing");
  }

  if (!validator.isEmail(ownerEmail)) {
    throw Error("Email not valid");
  }

  const exist = await this.findOne({ ownerEmail });
  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const restaurant = await this.create({
    name,
    ownerEmail,
    password: hash,
  });

  return restaurant;
};

OwnerSchema.statics.Login = async function (ownerEmail, password) {
  if (!ownerEmail || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(ownerEmail)) {
    throw Error("Email not valid");
  }

  const restaurant = await this.findOne({ ownerEmail });
  if (!restaurant) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, restaurant.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return restaurant;
};

module.exports = mongoose.model("Restaurant", OwnerSchema);
