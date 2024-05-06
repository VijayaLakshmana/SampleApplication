const express=require("express");
const ticketController=require("../controllers/ticketController");
const router = express.Router();
router.get("/",ticketController.getAllTickets );
router.post("/", ticketController.createTicket);
router.put("/:id",ticketController.updateTicketDetails);
router.put("/status/:id",ticketController.updateBookingStatus);

module.exports=router;