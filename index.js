const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");
const { queries, nameQuery, roleQuery, managerQuery } = require("./queries");
const { NewEmp, NewDept } = require("./constructors");
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

const viewEmps = async () => {
    const res = await viewAllEmps();
    console.log("\n");
    console.log(`Viewing all employees...`);
    console.log("\n");
    return Promise.resolve(res);
  };

const addEmp = async () => {
  const name = await prompt(nameQuery);
  const role = await prompt(roleQuery[0]);
  const manager = await prompt(managerQuery[0]);
  const emp = new NewEmp(
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
  console.log("\n");
  console.log(`Viewing employees on ${manager.first}'s team...`);
  console.log("\n");
  return Promise.resolve(res);
};

const viewManagers = async () => {
  const res = await viewAllManagers();
  console.log("\n");
  console.log(`Viewing all managers...`);
  console.log("\n");
  return Promise.resolve(res);
};
// !!!!!!!!!!!!! CONSTRUCTORS NEEDED
// department funcs
const addDept = async () => {
  const answer = await prompt(deptQuery[1]);
  const dept = NewDept(answer.name)
  console.log("\n");
  console.log("Adding department...");
  console.log("\n");
  return Promise.resolve(addDepts(dept));
};

const removeDept = async () => {
  const dept = await prompt(deptQuery[2]);
  const res = await removeDepts(dept.departmentId);
  console.log("\n");
  console.log("Removing department...");
  console.log("\n");
  return Promise.resolve(res);
};

const deptBudget = async () => {};

const viewDepts = async () => {
  const res = await viewAllDepts();
  console.log("\n");
  console.log(`Viewing all departments...`);
  console.log("\n");
  return Promise.resolve(res);
};


// role funcs
const addRole = async () => {
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

const removeRole = async () => {
  const emp = await prompt(empQuery[0]);
  const res = await removeEmps(emp.employeeId);
  console.log("\n");
  console.log("Removing employee...");
  console.log("\n");
  return Promise.resolve(res);
};

const viewRoles = async () => {
  const res = await viewAllManagers();
  console.log("\n");
  console.log(`Viewing all managers...`);
  console.log("\n");
  return Promise.resolve(res);
};

const dispatchOne = async (chosen) => {
  const list = {
    //employee
    ADD_EMP: addEmp(),
    REMOVE_EMP: removeEmp(),
    VIEW_EMP: viewEmps(),
    VIEW_EMP_BY_DEPT: viewEmpByDept(),
    VIEW_EMP_BY_MANAGER: viewEmpByManager(),
    UPDATE_EMP_ROLE: updateEmpRole(),
    UPDATE_EMP_MANAGER: updateEmpManager(),
    VIEW_MANAGERS: viewManagers(),

    //department
    ADD_DEPT: addDept(),
    REMOVE_DEPT: removeDept(),
    VIEW_DEPTS: viewDepts(),
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
