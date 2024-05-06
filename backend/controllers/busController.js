const busService = require("../service/busService");

class BusController {
  async getAllBus(req, res) {
    try {
      const buses = await busService.getAllBus();
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBusById(req, res) {
    const id = req.params.id;
    try {
      const bus = await busService.getBusById(id);
      if (bus) {
        res.json(bus);
      } else {
        res.status(404).json({ error: "Bus not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBus(req, res) {
    const busId = req.params.id;
    const { date, bookedSeats } = req.body;
    try {
      const updatedBus = await busService.updateBus(busId, date, bookedSeats);
      res.json(updatedBus);
    } catch (error) {
      console.error("Error updating bus:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async updateBusDetails(req, res) {
    const busId = req.params.id;
    const { date, selectedSeats } = req.body;
    try {
      await busService.updateBusDetails(busId, date, selectedSeats);
      res.status(200).json({ message: "Bus details updated successfully" });
    } catch (error) {
      console.error("Error updating bus details:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateBusSeat(req, res) {
    const busId = req.params.id;
    const updatedBus = req.body;
    try {
      const bus = await busService.updateBusSeat(busId, updatedBus);
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
      res.json(bus);
    } catch (error) {
      console.error("Error updating bus seat:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BusController();

