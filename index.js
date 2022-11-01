const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");
const db = require("./db");
const { queries, nameQuery, roleQuery, managerQuery } = require("./queries");
const { newEmp } = require("./constructors");
const employeefuncs = require("./db/connections/employeefuncs");

//destructuring db funcs
//employee
const {
  addEmps,
  updateEmps,
  removeEmps,
  updateEmpsManager,
  viewAllEmps,
} = require("./db/connections/employeefuncs");
//manager
const {
  viewEmpsByManager,
  viewAllManagers,
} = require("./db/connections/managerfuncs");
//role
const {
  addRoles,
  removeRoles,
  viewAllRoles,
} = require("./db/connections/rolefuncs");
//department
const {
  addDepts,
  removeDepts,
  viewAllDepts,
  viewEmpsByDept,
  viewDeptBudgets,
} = require("./db/connections/departmentfuncs");

//display logo and call to start stack recursion
async () => {
  const logoart = logo({ name: "Employee Manager" }).render();
  console.log(logoart);
  callStack();
};

// func that will begin process
const callStack = async () => {
  await userChoices().then(callStack());
};

// exit process
const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

const userChoices = async () => {
  const query = await prompt([queries]);
  const chosen = query.choice;
  // dispatch table selects next action
  return dispatchOne(chosen);
};

// employee funcs

const addEmp = async () => {
  const name = await prompt(nameQuery);
  const role = await prompt(roleQuery[0]);
  const manager = await prompt(managerQuery[0]);
  const emp = await newEmp(
    name.first,
    name.last,
    role.roleId,
    manager.managerId
  );
  console.log("\n");
  console.log("Adding employee...");
  console.log("\n");
  return Promise.resolve(addEmps(emp));
};

const removeEmp = async () => {
  const emp = await prompt(empQuery[0]);
  const res = await removeEmps(emp.employeeId);
  console.log("\n");
  console.log("Removing employee...");
  console.log("\n");
  return Promise.resolve(res);
};

const updateEmpRole = async () => {
  const emp = await prompt(empQuery[1]);
  const res = await updateEmps(emp.employeeId);
  console.log("\n");
  console.log("Updating employee role...");
  console.log("\n");
  return Promise.resolve(res);
};

const updateEmpManager = async () => {
  const emp = await prompt(empQuery[2]);
  const managers = await prompt(managerQuery[1]);
  const res = await updateEmpsManager(emp.employeeId, managers.managerId);
  console.log("\n");
  console.log("Updating employee manager...");
  console.log("\n");
  return Promise.resolve(res);
};

const viewEmpByDept = async () => {
  const dept = await prompt(deptQuery[0]);
  const res = await viewEmpsByDept(dept.departmentId);
  console.log("\n");
  console.log(`Viewing employees from ${dept.name}...`);
  console.log("\n");
  return Promise.resolve(res);
};

const viewEmpByManager = async () => {
  const manager = await prompt(managerQuery[2]);
  const res = await viewEmpsByManager(manager.managerId);
  return Promise.resolve(res);
};

const viewManagers = async () => {
  const manager = await prompt(managerQuery[2]);
  const res = await viewAllManagers();
  return Promise.resolve(res);
};

// department funcs
const addDept = async () => {};

const removeDept = async () => {};

const deptBudget = async () => {};

// role funcs
const addRole = async () => {};

const removeRole = async () => {};

const viewRoles = async () => {};

const dispatchOne = async (chosen) => {
  const list = {
    //employee
    ADD_EMP: addEmp(),
    REMOVE_EMP: removeEmp(),
    VIEW_EMP: viewAllEmps(),
    VIEW_EMP_BY_DEPT: viewEmpByDept(),
    VIEW_EMP_BY_MANAGER: viewEmpByManager(),
    UPDATE_EMP_ROLE: updateEmpRole(),
    UPDATE_EMP_MANAGER: updateEmpManager(),
    VIEW_MANAGERS: viewManagers(),

    //department
    ADD_DEPT: addDept(),
    REMOVE_DEPT: removeDept(),
    VIEW_DEPTS: viewAllDepts(),
    DEPT_SALARIES: deptBudget(),

    //roles
    ADD_ROLE: addRole(),
    REMOVE_ROLE: removeRole(),
    VIEW_ROLES: viewRoles(),

    //exit process
    QUIT: quit(),
    default: quit(),
  };
  return chosen ? list[chosen] : list["default"];
};
