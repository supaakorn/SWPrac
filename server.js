const express = require("express");
const dotenv = require("dotenv");
const hospitals = require("./routes/hospitals");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const appointments = require("./routes/appointments");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.unsubscribe(cookieParser());

app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    " mode on port ",
    PORT
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit process
  server.close(() => process.exit(1));
});
