const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require("cors");
const user=require("./routes/user");
const bus=require("./routes/bus");
const ticket=require("./routes/ticket");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:3000"}));
app.use(bodyParser.json());
app.use("/user",user);
app.use("/bus",bus);
app.use("/ticket",ticket);


mongoose
  .connect("mongodb://localhost:27017/Bus_Booking")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/api/example", (req, res) => {
  res.json({ message: "Example route" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
