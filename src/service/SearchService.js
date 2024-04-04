import Api from "./ApiService";
import { updateField } from "../Redux/BusDetails";
class BusSearchService {
  constructor() {
    this.busUrl = process.env.REACT_APP_BUS_URL;
    this.api = new Api();
  }
  async busData(dispatch, toast) {
    try {
      const response = await this.api.get(this.busUrl);
      dispatch(updateField({ field: "busDetails", value: response.data }));
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  }
  async updateBusDetails(busDetails, date) {
    busDetails.map(async (bus) => {
      if (
        bus.dates.length === 0 ||
        !bus.dates.find((dateObj) => dateObj.date === date)
      ) {
        await this.api.put(`${this.busUrl}/${bus.id}`, {
          ...bus,
          dates: [...bus.dates, { date: date, bookedSeats: [] }],
        });
      }
    });
  }
}
export default BusSearchService;