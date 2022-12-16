const { find } = require("../models/findbyName");

const userByname = (req, res) => {
  find.username(req.body.name, (response) => {
    if (!response[0]) {
      return res.status(404).json({ message: "Name Does Not Exist" });
    } else {
      return res.status(200).json(response);
    }
  });
};

module.exports = { userByname };
