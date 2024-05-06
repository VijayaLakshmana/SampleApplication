const express=require("express");

const busController=require("../controllers/busController");

const router = express.Router();

router.get("/", busController.getAllBus);
router.get("/:id", busController.getBusById);
router.put("/:id", busController.updateBus);
router.put("/seat/:id",busController.updateBusDetails);
router.put("/seat/delete/:id",busController.updateBusSeat);



module.exports=router;
