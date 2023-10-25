const User = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserService = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res
        .status(400)
        .json({ msg: "Username already used.", path: "username" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign(
      {
        id: user._id,
        username,
      },
      process.env.SECRET_KEY
    );
    return res.status(201).json({ access_token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Failed to create user." });
  }
};
const getAllUserService = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    return res.status(201).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Failed to fetch all users." });
  }
};

module.exports = { createUserService, getAllUserService };
