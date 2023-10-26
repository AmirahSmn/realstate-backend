const express = require("express");
const connectDB = require("./connect");
const cors = require("cors");
const app = express();
const port = 3000;
const blogsRouter = require("./routes/blog");
const sitesRouter = require("./routes/site");
const contactsRouter = require("./routes/contact");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const propertyRouter = require("./routes/property");

require("dotenv").config();
app.use(express.json({ limit: "500kb" }));
app.use(cors());
app.use("/api/blog", blogsRouter);
app.use("/api/site", sitesRouter);
app.use("/api/contact", contactsRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);

const start = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
