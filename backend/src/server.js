require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")
const auth = require("./routes/auth");
const course = require("./routes/course");
const user = require("./routes/user");
const video = require("./routes/video");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../../frontend/build')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend/build','index.html'))
})
app.use("/auth", auth);
app.use("/courses", course);
app.use("/users", user);
app.use('/video', video)


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));
