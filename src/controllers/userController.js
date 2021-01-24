import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (err) {
    return res.status(400).send(err);
  }
});


router.post("/create", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ errors: "User already exists." });
    const user = await User.create(req.body);
    return res.send({ user });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const isValid = await bcrypt.compare(password, user.password);
    return isValid
      ? res.send({
          user,
          token: await generateToken(user),
        }) //send token
      : res.status(400).send({ error: "Password invalid" });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/find", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ errors: "User not found." });
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

const generateToken = async ({ email }) => {
  return jwt.sign({ email }, "supersecret", { expiresIn: 120 });
};

export default (app) => app.use("/users", router);
