const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
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
router.get("/find/:id", getHotel);

// Get All
router.get("/", getAllHotels);
router.get("/count-by-city", countByCity);
router.get("/count-by-type", countByType);
router.get("/room/:id", countByType);

module.exports = router;
