//.............all handellings..............
require("dotenv").config();
const express = require("express");
const app = express();
const joi = require("joi");
const router = require("./controller/route");
const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/student", router);
app.use("/subject", router);
app.use("/stsb", router);

//..............server status...............
app.listen(port, (err) => {
  if (!err) {
    console.log(` server is runnig on port no:`);
  } else {
    console.log(err);
  }
});
