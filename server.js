//.............all handellings..............
require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./controller/router");
const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/student", router);
app.use("/subject", router);
app.use("/stsb", router);
app.use("/", router);

//..............server status...............
app.listen(port, (err) => {
  if (!err) {
    console.log(` server is runnig on port no 👉 ${port}`);
  } else {
    console.log(err);
  }
});
