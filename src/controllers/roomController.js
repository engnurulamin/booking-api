const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async (req, res, next) => {
  const hoteliid = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hoteliid, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatededRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatededRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const datesToUpdate = req.body.dates;

    if (!roomId || !datesToUpdate) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const roomExists = await Room.exists({ "roomNumbers._id": roomId });

    if (!roomExists) {
      return res.status(404).json({ error: "Room not found" });
    }

    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": datesToUpdate,
        },
      }
    );

    res.status(200).json({ message: "Room status has been updated" });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const hoteliid = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hoteliid, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  deleteRoom,
  updateRoom,
  getRoom,
  updateRoomAvailability,
};
