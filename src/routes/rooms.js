const express = require("express");

const { verifyAdmin } = require("../utils/verifyToken");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} = require("../controllers/roomController");

const router = express.Router();

// Create
router.post("/:hotelid", createRoom);

// Update
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id/:hotelid", deleteRoom);

// Get One
router.get("/:id", getRoom);

// Get All
router.get("/", getAllRooms);

module.exports = router;
