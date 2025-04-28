const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    restaurantId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate unique restaurantId
RestaurantSchema.pre("save", async function (next) {
  if (!this.restaurantId) {
    const lastRestaurant = await this.constructor
      .findOne()
      .sort({ createdAt: -1 });
    let newIdNum = 1;

    if (lastRestaurant && lastRestaurant.restaurantId) {
      const lastId = parseInt(lastRestaurant.restaurantId.split("-")[1]);
      newIdNum = lastId + 1;
    }

    this.restaurantId = `RI-${newIdNum.toString().padStart(4, "0")}`;
  }

  next();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
