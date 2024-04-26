const mongoose = require("mongoose");

const boardingStopSchema = new mongoose.Schema({
  stopingPoint: { type: String, required: true },
  time: { type: String, required: true },
});

const dropingStopSchema = new mongoose.Schema({
  stopingPoint: { type: String, required: true },
  time: { type: String, required: true },
});

const dateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  bookedSeats: { type: [Number], default: [] },
});

const busSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  busname: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  boardingStop: { type: [boardingStopSchema], required: true },
  dropingStop: { type: [dropingStopSchema], required: true },
  fromTiming: { type: String, required: true },
  toTiming: { type: String, required: true },
  dates: { type: [dateSchema], default: [] },
  seat: { type: Number, required: true },
  hrs: { type: String, required: true },
  AC: { type: Boolean, default: false },
  isSeater: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
