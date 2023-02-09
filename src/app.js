const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())

//import 
const route = require("./routes/routes")

//middleware
app.use(express.json());

//route
app.use("/",route)

module.exports = app;