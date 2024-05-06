const ticketService = require("../service/ticketService");

class TicketController {
  async getAllTickets(req, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateTicketDetails(req, res) {
    const bookingId = req.params.id;
    const updatedTicket = req.body;
    try {
      const ticket = await ticketService.updateTicketDetails(bookingId, updatedTicket);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket details:", error);
      res.status(500).json({ error: "Failed to update ticket details" });
    }
  }

  async updateBookingStatus(req, res) {
    const bookingId = req.params.id;
    try {
      const ticket = await ticketService.updateBookingStatus(bookingId);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ error: "Failed to update booking status" });
    }
  }

  async createTicket(req, res) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new TicketController();

