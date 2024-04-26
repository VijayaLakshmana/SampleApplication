const Ticket = require("../models/ticketModel");

const getAllTickets = async (req, res) => {
  console.log(2);
  try {
    const users = await Ticket.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// const createTicket = async (req, res) => {
//   console.log("1");
//   const {
//     _id,
//     username,
//     busName,
//     date,
//     from,
//     boardingPoint,
//     fromTime,
//     to,
//     dropingPoint,
//     toTime,
//     price,
//     email,
//     phone,
//     connection,
//     hrs,
//     bookingStatus,
//     seats,
//   } = req.body;
//   try {
//     console.log("hello");
//     console.log(req.body);
//     const newUser = await Ticket.create({
//       _id,
//       username,
//       busName,
//       date,
//       from,
//       boardingPoint,
//       fromTime,
//       to,
//       dropingPoint,
//       toTime,
//       price,
//       email,
//       phone,
//       connection,
//       hrs,
//       bookingStatus,
//       seats,
//     });
//     console.log(newUser);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ error: "Invalid data" });
//   }
// };

const createTicket = async (req, res) => {
  try {
    const {
      _id,
      username,
      busName,
      date,
      from,
      boardingPoint,
      fromTime,
      to,
      dropingPoint,
      toTime,
      price,
      email,
      phone,
      connection,
      hrs,
      bookingStatus,
      seats,
    } = req.body;


    const ticket = new Ticket({
      _id,
      username,
      busName,
      date,
      from,
      boardingPoint,
      fromTime,
      to,
      dropingPoint,
      toTime,
      price,
      email,
      phone,
      connection,
      hrs,
      bookingStatus,
      seats, 
    });

  
    await ticket.save();

    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTickets,
  createTicket,
};
