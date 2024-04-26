import Api from "./ApiService";
class BookingService {
  constructor() {
    this.api = new Api();
    this.bookingUrl = process.env.REACT_APP_BOOKING_URL;
    this.busUrl = process.env.REACT_APP_BUS_URL;
  }
  async bookTicket(newBooking, toast) {
    try {
      await this.api.post(this.bookingUrl, newBooking);
      toast.success("Ticket booked.");
    } catch (err) {
      toast.error("Failed: " + err.message);
    }
  }
  async updateBusSeatDetails(busDetails,selectedBus,selectedSeats,date,toast,usenavigate) {
    try {
      await Promise.all(
        busDetails.map(async (bus) => {
          if (bus._id === selectedBus._id) {
            console.log(bus._id,"hello");
            await this.api.put(`${this.busUrl}/seat/${bus._id}`, {
              date:date,
              selectedSeats:selectedSeats
            });
          }
        })
      );
      toast.success(`Selected seats: ${selectedSeats[date]}`);
      usenavigate("/");
    } catch (err) {
      console.error("Error updating bus details:", err);
    }
  }
}
export default BookingService;