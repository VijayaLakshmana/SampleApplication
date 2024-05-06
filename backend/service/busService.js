const Bus = require("../models/busModel");
const BusRepository = require("../repository/busRepository");

class BusService {
  async getAllBus() {
    try {
      return await BusRepository.getAllBus();
    } catch (error) {
      throw new Error("Failed to fetch buses from the database");
    }
  }

  async getBusById(id) {
    try {
      return await BusRepository.getBusById(id);
    } catch (error) {
      throw new Error("Failed to fetch bus from the database");
    }
  }

  async updateBus(busId, date, bookedSeats) {
    try {
      let bus = await BusRepository.getBusById(busId);
      if (!bus) {
        throw new Error("Bus not found");
      }
      const existingDate = bus.dates.find((dateObj) => dateObj.date === date);
      if (existingDate) {
        existingDate.bookedSeats = bookedSeats;
      } else {
        bus.dates.push({ date, bookedSeats });
      }
      bus = await Bus.create(bus); 
      return bus;
    } catch (error) {
      throw new Error("Failed to update bus in the database");
    }
  }

  async updateBusDetails(busId, date, selectedSeats) {
    try {
      const seat = selectedSeats[date];
      let bus = await BusRepository.getBusById(busId);
      if (!bus) {
        throw new Error("Bus not found");
      }
      const existingDate = bus.dates.find((dateObj) => dateObj.date === date);
      if (!existingDate) {
        throw new Error("Date not found for the bus");
      }
      existingDate.bookedSeats.push(...seat);
      bus = await Bus.create(bus); 
      return bus;   
    } catch (error) {
      throw new Error("Failed to update bus details in the database");
    }
  }

  async updateBusSeat(busId, updatedBus) {
    try {
      return await BusRepository.updateBusSeat(busId, updatedBus);
    } catch (error) {
      throw new Error("Failed to update bus seat in the database");
    }
  }
}

module.exports = new BusService();
