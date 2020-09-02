const auth = require("./../middleware/auth");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("./../models/user");

// get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User not found.");
  res.send(user);
});

// get all users - functionality for admin
router.get("/", async (req, res) => {
  const users = await User.find().sort().select("-password");
  if (!users.length) return res.status(404).send("No user found.");
  res.send(users);
});

// add new user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, isAdmin } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({ name, email, password, isAdmin });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// edit user using id as route param -functionality for admin
// router.put("/:id", async (req, res) => {
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body },
//       { new: true }
//     );
//     if (!user) return res.status(404).send("User with given ID was not found.");
//     res.send(user);
// });

// delete user using id as route param - functionality for admin
// router.delete("/:id", async (req, res) => {
//     const user = await User.findByIdAndRemove(req.params.id);
//     if (!user) return res.status(404).send("User with given ID was not found.");
//     res.send(user);
// });

module.exports = router;
