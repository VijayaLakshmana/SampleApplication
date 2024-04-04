import Api from "./ApiService";
import { updateField } from "../Redux/BusDetails";
class TicketService {
  constructor() {
    this.api = new Api();
    this.bookingUrl = process.env.REACT_APP_BOOKING_URL;
  }
  async showBooking(dispatch,toast) {
    try {
      const response = await this.api.get(this.bookingUrl);
      dispatch(updateField({ field: "ticketDetails", value: response.data }));
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  }
  async  fetchData(username,dispatch,isToday) {
    try {
      const response = await this.api.get(this.bookingUrl);
      const updatedBookings = [];
      const today = new Date();
      let updated = false;
      for (const booking of response.data) {
        const ticketDate = new Date(booking.date);
        if (
          username === booking.username &&
          today > ticketDate &&
          !isToday(ticketDate) &&
          booking.bookingStatus === "booked"
        ) {
          await this.api.put(`${this.bookingUrl}/${booking.id}`, {
            ...booking,
            bookingStatus: "Completed",
          });
          updatedBookings.push({
            ...booking,
            bookingStatus: "Completed",
          });
          updated = true;
        } else {
          updatedBookings.push(booking);
        }
      }
      if (updated) {
        dispatch(updateField({ field: "ticketDetails", value: updatedBookings}));
      } else {
        dispatch(updateField({ field: "ticketDetails", value: response.data}));
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  }
}
export default TicketService;
