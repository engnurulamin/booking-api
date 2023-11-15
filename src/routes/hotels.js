const express = require("express");
const Hotel = require("../models/Hotel");
const { createError } = require("../utils/error");

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatededHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatededHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const updatededHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get One
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All
router.get("/", async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
