
const express = require("express");
const cors = require("cors");

const connectDB = require('./db/db.js')

const ticketRoutes = require("./routes/tickets.js");
const userRoutes = require("./routes/users.js");

const config = require("./config");

const app = express();

app.use(cors()); // To verify cross origin requests (for eg: Accepts only 3000 port requests)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/tickets", ticketRoutes);
app.use("/user", userRoutes);

connectDB();
const server = async () => {
    try {
      await app.listen(config.PORT, () => {
        console.log(`✅ Server running on port: http://localhost:${config.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  server();