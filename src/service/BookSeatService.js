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
          if (bus.id === selectedBus.id) {
            await this.api.put(`${this.busUrl}/${bus.id}`, {
              ...bus,
              dates: bus.dates.map((dateObj) => {
                if (dateObj.date === date) {
                  return {
                    ...dateObj,
                    bookedSeats: [
                      ...dateObj.bookedSeats,
                      ...selectedSeats[date],
                    ],
                  };
                }
                return dateObj;
              }),
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