const TicketRepository = require("../repository/ticketRepository");

class TicketService {
  async getAllTickets() {
    try {
      return await TicketRepository.find();
    } catch (error) {
      throw new Error("Failed to fetch tickets from the database");
    }
  }

  async updateTicketDetails(bookingId, updatedTicket) {
    try {
      return await TicketRepository.updateTicketDetails(bookingId, updatedTicket);
    } catch (error) {
      throw new Error("Failed to update ticket details in the database");
    }
  }

  async updateBookingStatus(bookingId) {
    try {
      return await TicketRepository.updateBookingStatus(bookingId);
    } catch (error) {
      throw new Error("Failed to update booking status in the database");
    }
  }

  async createTicket(ticketData) {
    try {
      return await TicketRepository.create(ticketData);
    } catch (error) {
      throw new Error("Failed to create ticket in the database");
    }
  }
}

module.exports = new TicketService();
