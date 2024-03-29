const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

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
    const { min, max, featured, limit, ...others } = req.query;

    const filter = {};
    if (min) {
      filter.cheapestPrice = { $gte: parseInt(min || 1000) };
    }
    if (max) {
      filter.cheapestPrice = {
        // ...filter.cheapestPrice,
        $lte: parseInt(max || 5000),
      };
    }
    if (featured) {
      filter.featured = featured === "true";
    }

    // const hotels = await Hotel.find(filter).limit(parseInt(limit) || 4);
    const hotels = await Hotel.find(filter).limit(parseInt(limit));

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// const getAllHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const limit = parseInt(req.query.limit || 4);
//     const hotels = await Hotel.find();
//     res.status(200).json(hotels);
//   } catch (error) {
//     next(error);
//   }
// };

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getHotel,
  countByType,
  countByCity,
  getHotelRooms,
};
