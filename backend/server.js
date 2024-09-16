const express = require("express");
const authRouter = require("./src/routes/auth.route");
const messageRouter = require("./src/routes/message.route")
const connectDB = require("./src/config/db.config.js");

require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
