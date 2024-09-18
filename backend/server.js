const express = require("express");
const cors = require("cors")
const authRouter = require("./src/routes/auth.route");
const messageRouter = require("./src/routes/message.route");
const userRouter = require("./src/routes/user.route.js");
const connectDB = require("./src/config/db.config.js");

require("dotenv").config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',   // Allow these HTTP methods
    credentials: true,                // Enable cookies to be sent with requests if necessary
  }));

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
