const express=require("express");
const {
  getAllTickets,
  createTicket,
  updateTicketDetails,
  updateBookingStatus,
} =require("../controllers/ticketController");
const router = express.Router();
router.get("/",getAllTickets );
router.post("/", createTicket);
router.put("/:id",updateTicketDetails);
router.put("/status/:id",updateBookingStatus);

module.exports=router;