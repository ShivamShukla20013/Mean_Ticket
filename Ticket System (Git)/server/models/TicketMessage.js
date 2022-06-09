const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    ticket_no: {
      type: String
    },
    emp_id: { type: String },
    usrname: { type: String, required: true },
    ticket_desc: { type: String, required: true },
    deleted_At: {
      type: Date,
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
  }
);

const TicketMessageModel = model("TicketMessage", ticketSchema);

module.exports = TicketMessageModel;
