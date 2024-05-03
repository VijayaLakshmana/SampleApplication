const Ticket = require("../models/ticketModel");

const getAllTickets = async (req, res) => {
  try {
    const users = await Ticket.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTicketDetails = async (req, res) => {
  const bookingId  = req.params.id; 
  const updatedTicket = req.body; 
  try {
    const ticket = await Ticket.findByIdAndUpdate(bookingId, updatedTicket, { new: true });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket details:", error);
    res.status(500).json({ error: "Failed to update ticket details" });
  }
};

const updateBookingStatus=async(req,res)=>{
  const bookingId=req.params.id;
  try {
    const ticket=await Ticket.findByIdAndUpdate(bookingId, { bookingStatus: "Completed" });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket details:", error);
    res.status(500).json({ error: "Failed to update ticket details" });
  }
};

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
  updateTicketDetails,
  updateBookingStatus,
};
