const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const router = express.Router();

// Create
router.post("/", createHotel);

// Update
router.put("/:id", updateHotel);

// Delete
router.delete("/:id", deleteHotel);

// Get One
router.get("/:id", getHotel);

// Get All
router.get("/", getAllHotels);

module.exports = router;
