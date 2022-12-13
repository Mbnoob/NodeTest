const login = require("../models/login");
const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

const userLogin = (req, res) => {
  let data = req.body;
  login.withLogin(data.email, (response) => {
    if (!response[0]) {
      return res.json({ message: "Invalid Email-id" });
    }
    let result = compareSync(data.passwords, response[0].passwords);
    if (result) {
      response[0].passwords = undefined;
      let jsonwebtoken = sign({ result: response }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPAIRED,
      });
      return res.json({
        message: "login sucessfully",
        token: jsonwebtoken,
      });
    } else {
      return res.status(404).json({ message: "Invalid passwords" });
    }
  });
};

module.exports = { userLogin };
