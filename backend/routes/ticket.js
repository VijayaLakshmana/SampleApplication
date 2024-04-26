const express=require("express");
const {
  getAllTickets,
  createTicket,
} =require("../controllers/ticketController");
const router = express.Router();
router.get("/",getAllTickets );
router.post("/", createTicket);

module.exports=router;