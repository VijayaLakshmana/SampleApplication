const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  status: {
    type: String,
    enum: ["canceled", "booked"],
    required: true,
  },
});
const seatSchema = new mongoose.Schema({
  seat: {
    type: Number,
    required: true,
  },
  passenger: {
    type: passengerSchema,
    required: true,
  },
});


const bookingSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  boardingPoint: {
    type: String,
    required: true,
  },
  fromTime: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  dropingPoint: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  connection: {
    type: String,
    required: true,
  },
  hrs: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["canceled", "booked", "Completed"],
    required: true,
  },
  seats: {
    type: [seatSchema],
    required: true,
  },
});

const Ticket=mongoose.model("Ticket", bookingSchema);
module.exports=Ticket;
