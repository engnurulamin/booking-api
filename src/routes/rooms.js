const express = require("express");

const { verifyAdmin } = require("../utils/verifyToken");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} = require("../controllers/roomController");

const router = express.Router();

// Create
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom);

// Delete
router.delete("/:id", verifyAdmin, deleteRoom);

// Get One
router.get("/:id", getRoom);

// Get All
router.get("/", getAllRooms);

module.exports = router;
