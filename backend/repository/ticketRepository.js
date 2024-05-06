const Ticket = require("../models/ticketModel");

class TicketRepository {
  find() {
    return Ticket.find();
  }

  updateTicketDetails(bookingId, updatedTicket) {
    return Ticket.findByIdAndUpdate(bookingId, updatedTicket);
  }

  updateBookingStatus(bookingId) {
    return Ticket.findByIdAndUpdate(bookingId, { bookingStatus: "Completed" });
  }

  async create(ticketData) {
    return Ticket.create(ticketData);
  }
}

module.exports = new TicketRepository();
