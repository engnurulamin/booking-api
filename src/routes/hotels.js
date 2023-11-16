const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/:id", verifyAdmin, deleteHotel);

// Get One
router.get("/:id", getHotel);

// Get All
router.get("/", getAllHotels);

module.exports = router;
