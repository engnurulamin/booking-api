const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

// Update
router.put("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

// Get One
router.get("/:id", getUser);

// Get All
router.get("/", getAllUsers);

module.exports = router;
