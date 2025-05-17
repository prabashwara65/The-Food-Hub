const express = require("express");
const {
  getAdminOverview,
} = require("../Controller/AnalyticsController");

const router = express.Router();

router.get("/overview", getAdminOverview);

module.exports = router;
