const cors = require("cors")
const authRouter = require("./src/routes/auth.route");
const messageRouter = require("./src/routes/message.route");
const userRouter = require("./src/routes/user.route.js");
const connectDB = require("./src/config/db.config.js");
const { app, server } = require("./src/config/socket.config.js");

require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE',   // Allow these HTTP methods
  credentials: true,                // Enable cookies to be sent with requests if necessary
}));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

server.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
