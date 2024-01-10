const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// understanding authentication

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user! You are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user! You are logged in And you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin! You are logged in And you can delete all accounts");
// });

// understanding authentication

// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// Get One
router.get("/:id", verifyUser, getUser);

// Get All
// router.get("/", verifyAdmin, getAllUsers);
router.get("/", getAllUsers);

module.exports = router;
