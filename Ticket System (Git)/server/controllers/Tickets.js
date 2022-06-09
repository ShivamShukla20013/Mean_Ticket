const ticket = require("../models/TicketMessage");
const TicketMessage = require("../models/TicketMessage.js");

const createTicket = async (req, res) => {
  const {usrname, ticket_desc} = req.body;
  console.log(req.body);

  try {
    const newTicket = await ticket.create({usrname, ticket_desc});
    
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { id: _id } = req.params;
  const ticket = req.body;


  if (!_id) return res.status(404).send("No post with that id.");

  const updatedTicket = await TicketMessage.findByIdAndUpdate(
    _id,
    { ...ticket,
    updatedAt: new Date().toISOString() },
    { new: true, timestamps: {createdAt: false, updatedAt: true} }
  );
  res.status(200).json(updatedTicket);
};

const deleteTicket = async (req, res) => {
  const { id: _id } = req.params;

  const ticket = req.body;

  const { emp_id, ticket_desc} = req.body;

  if (!_id) return res.status(404).send("No post with that id.");

  const deletedTicket = await TicketMessage.findByIdAndUpdate(
    _id,
    {
      ...ticket,
      emp_id,
      ticket_desc,
      deleted_At: new Date().toISOString(),
      _id: _id,
    },
    { new: true }
  );
  res.status(200).json(deletedTicket);
};

const getTickets = async (req, res) => {
  try {
    const ticketMessage = await TicketMessage.find().sort({ createdAt: -1 });
    res.status(200).json(ticketMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets
};
