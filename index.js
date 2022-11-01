const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");
const db = require("./db");
const { queries, nameQuery, roleQuery, managerQuery } = require("./queries");
const { newEmp } = require("./constructors");

//destructuring db funcs
const { addEmps, updateEmps, removeEmps, updateEmpsManager, viewAllEmps } =
  Empdb(
    //display logo and call to start stack recursion
    async () => {
      const logoart = logo({ name: "Employee Manager" }).render();
      console.log(logoart);
      return await callStack();
    }
  );

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
  return Promise.resolve(addEmps(emp));
};

const removeEmp = async () => {
  const emp = await prompt(empQuery[0]);
  const res = await removeEmps(emp.employeeId);
  return Promise.resolve(res);
};

const updateEmpRole = async () => {
  const emp = await prompt(empQuery[1]);
  const res = await updateEmps(emp.employeeId);
  return Promise.resolve(res);
};

const updateEmpManager = async () => {
  const emp = await prompt(empQuery[2]);
  const managers = await prompt(managerQuery[1]);
  const res = await updateEmpsManager(emp.employeeId, managers.managerId);
  return Promise.resolve(res);
};

const viewEmpByDept = async () => {
  const dept = await prompt(deptQuery[0]);
  const res = await viewEmpsByDept(dept.departmentId);
  return Promise.resolve(res);
};

const viewEmpByManager = async () => {
  const manager = await prompt(managerQuery[2]);
  const res = await viewEmpsByManager(manager.managerId);
  return Promise.resolve(res);
};

const viewAllManagers = async () => {
  const manager = await prompt(managerQuery[2]);
  const res = await viewEmpsByManager(manager.managerId);
  return Promise.resolve(res);
};

// department funcs
const addDept = async () => {};

const removeDept = async () => {};

const deptBudget = async () => {};

// role funcs
const addRole = async () => {};

const removeRole = async () => {};

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
    VIEW_MANAGERS: viewAllManagers(),

    //department
    ADD_DEPT: addDept(),
    REMOVE_DEPT: removeDept(),
    VIEW_DEPTS: viewAllDepts(),
    DEPT_SALARIES: deptBudget(),

    //roles
    ADD_ROLE: addRole(),
    REMOVE_ROLE: removeRole(),
    VIEW_ROLES: viewAllRoles(),

    //exit process
    QUIT: quit(),
    default: quit(),
  };
  return chosen ? list[chosen] : list["default"];
};
