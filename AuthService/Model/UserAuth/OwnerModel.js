const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Using bcryptjs instead of bcrypt
const validator = require("validator");
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

async function getNextOwnerId() {
  const counter = await Counter.findOneAndUpdate(
    { id: "restaurantOwner" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `RO-${counter.seq.toString().padStart(4, "0")}`;
}

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

  const salt = await bcrypt.genSalt(10);  // bcryptjs genSalt
  const hash = await bcrypt.hash(password, salt);  // bcryptjs hash
  const ownerId = await getNextOwnerId();

  const restaurant = await this.create({
    ownerId,
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

  const match = await bcrypt.compare(password, restaurant.password); // bcryptjs compare
  if (!match) {
    throw Error("Incorrect password");
  }

  return restaurant;
};

module.exports = mongoose.model("Owner", OwnerSchema);
