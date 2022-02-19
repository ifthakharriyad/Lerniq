require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const course = require("./routes/course");
const user = require("./routes/user");
const video = require("./routes/video");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/courses", course);
app.use("/api/v1/users", user);
app.use('/api/v1/video', video)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
