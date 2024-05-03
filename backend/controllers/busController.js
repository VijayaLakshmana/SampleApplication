const Bus=require("../models/busModel");
const getAllBus = async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getBusById = async (req, res) => {
  const id = req.params.id;
  try {
    const bus = await Bus.findById(id);
    if (bus) {
      res.json(bus);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBus = async (req, res) => {
  const _id = req.params.id;
  const { date, bookedSeats } = req.body;
  try {
    let bus = await Bus.findById(_id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    const existingDate = bus.dates.find((dateObj) => dateObj.date === date);
    if (existingDate) {
      existingDate.bookedSeats = bookedSeats;
    } else {
      bus.dates.push({ date, bookedSeats });
    }
    bus = await bus.save();

    res.json(bus);
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(400).json({ error: "Invalid data" });
  }
};

const updateBusDetails = async (req, res) => {
  const _id = req.params.id;
  const { date, selectedSeats } = req.body;
  try {
    const seat=selectedSeats[date];
    await Bus.findOneAndUpdate(
      {_id, "dates.date":date},
      { $addToSet: { "dates.$.bookedSeats": { $each: seat } } }, 
      { new: true }
    );
    res.status(200).json({ message: "Bus details updated successfully" });
  } catch (error) {
    console.error("Error updating bus details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateBusSeat=async(req,res)=>{
  const busId  = req.params.id; 
  const updatedBus= req.body; 
  try {
    const ticket = await Bus.findByIdAndUpdate(busId, updatedBus, { new: true });
    if (!ticket) {
      return res.status(404).json({ error: "Bus Not Found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error updating ticket details:", error);
    res.status(500).json({ error: "Failed to update ticket details" });
  }

};

module.exports = {
  getAllBus,
  getBusById,
  updateBus,
  updateBusDetails,
  updateBusSeat,
};
