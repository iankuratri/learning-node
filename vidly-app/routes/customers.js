const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("./../models/customer");

// for getting all the customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  if (!customers.length) return res.status(404).send("No customers found.");
  res.send(customers);
});

// for getting a particular customer using id as route param
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with given ID was not found.");
  res.send(customer);
});

// for adding a new customer
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({ ...req.body });

  const result = await customer.save();
  res.send(result);
});

// for editing customer details
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("Customer with given ID was not found.");
  res.send(customer);
});

// for deleting a customer using id as route param
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with given ID was not found.");
  res.send(customer);
});

module.exports = router;
