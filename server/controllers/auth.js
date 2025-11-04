const { InternalError } = require("../utils/error");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs"); // bcryptjs is used in package.json
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send("Username is required");
    }
    if (!password) {
      return res.status(400).send("Password is required");
    }
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    res.json({ message: "user created" });
  } catch (error) {
    InternalError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //### check user email
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.enabled) {
      return res.status(400).json({ message: "User is not enabled" });
    }
    //### check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!!" });
    }
    //### create token
    const payload = {
      id_user: user.user_idid,
      username: user.username,
      role: user.role,
      address: user.address,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.send({ payload, token });
      }
    );
  } catch (error) {
    InternalError(res, error);
  }
};
