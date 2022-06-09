const { auth } = require('../middleware/auth.js')
const { Router } = require("express");

const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/tickets.js");

const router = Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.post("/delete/:id", deleteTicket);

module.exports = router;
