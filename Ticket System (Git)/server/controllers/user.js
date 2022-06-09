const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const signin = async (req, res) => {
  const { usrname, password } = req.body;

  try {
    const existingUser = await User.findOne({ usrname });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });

    const token = jwt.sign(
      { usrname: existingUser.usrname, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log(existingUser);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, usrname, password } = req.body;

  try {
    const existingUser = await User.findOne({ usrname });

    if (existingUser)
      return res.status(400).json({ message: "User Already Exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      usrname,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    const token = jwt.sign(
      { usrname: result.usrname, id: result._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = {
  signin,
  signup,
};
