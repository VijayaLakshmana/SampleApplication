import Api from "./ApiService";
class CancelDataService {
  constructor() {
    this.api = new Api();
    this.busUrl = process.env.REACT_APP_BUS_URL;
    this.bookingUrl = process.env.REACT_APP_BOOKING_URL;
  }
  async updateSeatCancelled(busId, updatedBusDetails) {
    const data=updatedBusDetails.find((bus) => bus._id === busId);
    await this.api.put(`${this.busUrl}/seat/delete/${busId}`,data);
  }
  async fetchBookingDetails(setTicketDetails) {
    try {
      const response = await this.api.get(this.bookingUrl);
      setTicketDetails(response.data);
    } catch (error) {
      console.log("Error fetching booking details:", error);
    }
  }
  async updateTicketDetails(bookingId, updatedTicket, toast) {
    try {
      await this.api.put(`${this.bookingUrl}/${bookingId}`, updatedTicket);
      toast.success("Ticket details updated successfully.");
    } catch (error) {
      console.error("Error updating ticket details:", error);
      toast.error("Failed to update ticket details: " + error.message);
    }
  }
}
export default CancelDataService;