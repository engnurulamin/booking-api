const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateHotel = async (req, res, next) => {
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
};

const deleteHotel = async (req, res, next) => {
  try {
    const updatededHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getHotel,
};
