const express = require("express");
const { validate } = require("../validation/validate");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");

const axios = require("axios");

axios.get("/login")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    if (error.response) {
      console.log('Server responded with status code:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error creating request:', error.message);
    }
  });
router.route("/login").post(async (req, res) => {
  try {
    const errors = validate(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        location: "",
        msg: "Incorrect username and/or password.",
        type: "",
        path: "",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          username,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ access_token: token });
    }
    return res.status(400).json({
      location: "",
      msg: "Incorrect username and/or password.",
      type: "",
      path: "",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to login.", path: "", location: "", type: "" });
  }
});

router.route("/verify").get(async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ msg: "please login!" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "please login!" });
    }
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (!data) {
      return res.status(401).json({ msg: "please login!" });
    }

    const user = await User.findById({ _id: data.id });
    if (!user) {
      return res.status(401).json({ msg: "please login" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(401).json({ msg: "please login!" });
  }
});

module.exports = router;
