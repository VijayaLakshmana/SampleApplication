const express=require("express");
const {
  getAllBus,
  getBusById,
  updateBus,
  updateBusDetails,
  updateBusSeat
} =require("../controllers/busController");

const router = express.Router();

router.get("/", getAllBus);
router.get("/:id", getBusById);
router.put("/:id", updateBus);
router.put("/seat/:id",updateBusDetails);
router.put("/seat/delete/:id",updateBusSeat);



module.exports=router;
