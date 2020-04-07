const mongoose = require("mongoose");

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to db

const db = mongoose.connect("mongodb://localhost:27017/customercli", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import model

const Customer = require("./models/customer");

// Add customer
const addCustomer = async (customer) => {
  try {
    await Customer.create(customer);
    console.info("New Customer Added ");
  } catch (e) {
    console.log("erreur", e);
  }
};
// Find customer
const findCustomer = async (name) => {
  // Make case insenstive
  const search = new RegExp(name, "i");
  const result = await Customer.find({
    $or: [{ firstname: search }, { lastname: search }],
  });
  console.info(result);
  console.info(`${result.length} matches`);
};

// Update customer
const updateCustomer = (_id, customer) => {
  Customer.update({ _id }, customer).then((customer) => {
    console.info("Customer Updated");
  });
};

// remove customer

const removeCustomer = (_id) => {
  Customer.remove({ _id }).then((customer) => {
    console.info("Customer Removed");
  });
};

// List customers

const listCustomers = async () => {
  try {
    const result = await Customer.find();
    console.info("Result:", result);
    console.info(result.length, "matches");
  } catch (e) {
    console.error("error", err);
  }
};
// Export all methods

module.exports = {
  addCustomer,
  findCustomer,
  listCustomers,
  removeCustomer,
  updateCustomer,
};
