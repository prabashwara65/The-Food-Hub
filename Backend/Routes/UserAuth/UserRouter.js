const express = require("express");

const {
  RegisterUser,
  LoginUser,
  GetUserCounts,
  GetUsersByRole,
  UpdateUser,
  DeleteUser,
} = require("../../Controller/UserAuth/UserController");

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.get("/user-counts", GetUserCounts);

router.get("/users", GetUsersByRole);

router.put("/users/:id", UpdateUser);

router.delete("/users/:id", DeleteUser);

module.exports = router;
