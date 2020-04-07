#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const {
  addCustomer,
  findCustomer,
  listCustomers,
  removeCustomer,
  updateCustomer,
} = require("./index");

// Customer Questions
const questions = [
  { type: "input", name: "firstname", message: "Customer First name" },
  { type: "input", name: "lastname", message: "Customer Last name" },
  { type: "input", name: "phone", message: "Customer phone number" },
  { type: "input", name: "email", message: "Customer Email " },
];

program.version("1.0.0").description("Client Managment system");

// program
//   .command("add <firstname> <lastname> <phone> <email>")
//   .alias("a")
//   .description("Add a customer")
//   .action((firstname, lastname, phone, email) => {
//     addCustomer({ firstname, lastname, phone, email });
//   });

// Add command

program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

// find command

program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

// Update command

program
  .command("update <id>")
  .alias("u")
  .description("Update a customer")
  .action((id) => {
    prompt(questions).then((answers) => updateCustomer(id, answers));
  });

program
  .command("remove <id>")
  .alias("rm")
  .description("Find a customer")
  .action((id) => removeCustomer(id));

program
  .command("show")
  .alias("s")
  .description("show all customers")
  .action(() => listCustomers());

program.parse(process.argv);
