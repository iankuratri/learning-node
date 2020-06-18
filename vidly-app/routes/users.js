const express = require("express");
const router = express.Router();
const { User, validateUser } = require("./../models/user");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    if (!users.length) return res.status(404).send("No user found.");
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get particular user using id as route param
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User with given ID was not found.");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// add new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// edit user using id as route param
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!user) return res.status(404).send("User with given ID was not found.");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete user using id as route param
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("User with given ID was not found.");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
