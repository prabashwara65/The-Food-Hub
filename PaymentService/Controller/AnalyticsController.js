const Order = require("../Model/Order/OrderModel");
const Restaurant = require("../Model/Restaurant/RestaurantModel");

const getAdminOverview = async (req, res) => {
  try {
    // Get all orders
    const orders = await Order.find();

    const totalOrders = orders.length;
    const totalRevenue = {
      admin: 0,
      delivery: 0,
      restaurant: 0,
    };

    const revenueByDate = {};

    orders.forEach((order) => {
      const adminCommission = order.amount * 0.1;
      const deliveryFee = order.amount * 0.05;
      const restaurantEarning = order.amount - adminCommission - deliveryFee;

      totalRevenue.admin += adminCommission;
      totalRevenue.delivery += deliveryFee;
      totalRevenue.restaurant += restaurantEarning;

      const dateKey = new Date(order.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD

      if (!revenueByDate[dateKey]) {
        revenueByDate[dateKey] = {
          admin: 0,
          delivery: 0,
          restaurant: 0,
        };
      }

      revenueByDate[dateKey].admin += adminCommission;
      revenueByDate[dateKey].delivery += deliveryFee;
      revenueByDate[dateKey].restaurant += restaurantEarning;
    });

    // Total restaurants
    const restaurants = await Restaurant.find();
    const totalRestaurants = restaurants.length;

    res.status(200).json({
      totalOrders,
      totalRestaurants,
      totalRevenue,
      revenueByDate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAdminOverview };
