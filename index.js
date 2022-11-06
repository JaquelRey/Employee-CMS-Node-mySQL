const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const { queries} = require('./queries');
const dispatchOne = require("./actions");
//destructuring db funcs

//display logo and call to start stack recursion
function start() {
  const logoart = logo({ name: "Employee Manager" }).render();
  console.log(logoart);
  callStack();
}

// func that will begin process
async function callStack() {
  // dispatch table selects next action
  console.log("\n");
  console.log(`Starting stack...`);
  console.log("\n");
  await prompt([queries])
    .then(async (query) => {
      const chosen = query.choice;
      await dispatchOne(chosen)
    })
    .then(async() => {
      await callStack();
    });
}

start()