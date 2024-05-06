const Bus = require("../models/busModel");

class BusRepository {
  getAllBus() {
    return Bus.find();
  }

  getBusById(id) {
    return Bus.findById(id);
  }

  updateBusSeat(busId, updatedBus) {
    return Bus.findByIdAndUpdate(busId, updatedBus);
  }
}

module.exports = new BusRepository();
