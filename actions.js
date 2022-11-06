const { prompt } = require("inquirer");
require("console.table");
const { roleQuery, managerQuery, deptQuery, empQuery } = require("./queries");
//destructuring db funcs
const EmpDb = require("./db/connections/employeefuncs");
const ManagerDb = require("./db/connections/managerfuncs");
const RoleDb = require("./db/connections/rolefuncs");
const DepartmentDb = require("./db/connections/departmentfuncs");
const { newEmployee, newDepartment, newRole } = require("./db/constructor");
const {
  viewEmp,
  viewManagers,
  viewDepts,
  viewRoles,
} = require("./db/selection");
//employee
const { addEmps, updateEmps, removeEmps, updateEmpsManager } = EmpDb;
//manager
const { viewEmpsByManager } = ManagerDb;
//role
const { addRoles, removeRoles } = RoleDb;
//department
const { addDepts, removeDepts, viewEmpsByDept } = DepartmentDb;

// exit process
function quit() {
  console.log("Goodbye!");
  process.exit();
}

// employee funcs
// viewing all the employees
async function viewEmps() {
  console.log("\n");
  console.log(`Viewing all employees...`);
  console.log("\n");
  const view = await viewEmp();
  console.log(view)
  return console.table(view);
}

async function addEmp() {
  return addEmps(newEmployee);
}

async function removeEmp() {
  await prompt(empQuery[0]).then(async (emp) => {
    const employee = emp.employeeId;
    console.log("\n");
    console.log(
      `Removing ${emp.first_name} ${emp.last_name} from your employees...`
    );
    console.log("\n");
    return await removeEmps(employee);
  });
}

async function updateEmpRole() {
  let employee;
  let newRole;
  await prompt(empQuery[1])
    .then(async (emp) => {
      employee = emp;
      await prompt(roleQuery[1]).then(async (role) => {
        newRole = role;
      });
    })
    .then(async () => {
      console.log("\n");
      console.log(
        `Updating ${emp.first_name} ${emp.last_name}'s role to ${role.title} ...`
      );
      console.log("\n");
      return await updateEmps(employee.employeeId, newRole.roleId);
    });
}

async function updateEmpManager() {
  let empId;
  let newManager;
  await prompt(empQuery[2])
    .then(async (emp) => {
      empId = emp.employeeId;
      await prompt(managerQuery[1]).then(async (manager) => {
        newManager = manager.managerId;
      });
    })
    .then(async () => {
      console.log("\n");
      console.log("Updating employee manager...");
      console.log("\n");
      return await updateEmpsManager(empId, newManager);
    });
}

async function viewEmpByDept() {
  await prompt(deptQuery[0]).then(async (dept) => {
    console.log("\n");
    console.log(`Viewing employees in ${dept.name}...`);
    console.log("\n");
    return await viewEmpsByDept(dept.departmentId).then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    });
  });
}

async function viewEmpByManager() {
  await prompt(managerQuery[2]).then(async (manager) => {
    console.log("\n");
    console.log(`Viewing employees on ${manager.first_name}'s team...`);
    console.log("\n");
    return await viewEmpsByManager(manager.managerId).then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    });
  });
}

async function viewManager() {
  console.log("\n");
  console.log(`Viewing all managers...`);
  console.log("\n");
  const view = await viewManagers();
  return console.table(view);
}

// department funcs
async function addDept() {
  console.log("\n");
  console.log("Adding department...");
  console.log("\n");
  return addDepts(newDepartment);
}

async function removeDept() {
  await prompt(deptQuery[2]).then(async (dept) => {
    console.log("\n");
    console.log(`Removing department ${dept.name}...`);
    console.log("\n");
    return await removeDepts(dept.departmentId);
  });
}

async function deptBudget() { }

async function viewDept() {
  console.log("\n");
  console.log(`Viewing all departments...`);
  console.log("\n");
  const view = await viewDepts();
  return console.table(view);
}

// role funcs
async function addRole() {
  return addRoles(newRole);
}

async function removeRole() {
  prompt(roleQuery[3]).then(async (role) => {
    console.log("\n");
    console.log(`Removing ${role.title} role ...`);
    console.log("\n");
    return await removeRoles(role.roleId);
  });
}

async function viewRole() {
  console.log("\n");
  console.log(`Viewing all roles...`);
  console.log("\n");
  const view = await viewRoles();
  console.log(view)
  return console.table(view);
}

async function dispatchOne(chosen) {
  console.log("\n");
  console.log(`Dispatching choice...`);
  console.log("\n");
  const list = {
    //employee
    ADD_EMP: addEmp,
    REMOVE_EMP: removeEmp,
    VIEW_EMP: viewEmps,
    VIEW_EMP_BY_DEPT: viewEmpByDept,
    VIEW_EMP_BY_MANAGER: viewEmpByManager,
    UPDATE_EMP_ROLE: updateEmpRole,
    UPDATE_EMP_MANAGER: updateEmpManager,
    VIEW_MANAGERS: viewManager,

    //department
    ADD_DEPT: addDept,
    REMOVE_DEPT: removeDept,
    VIEW_DEPTS: viewDept,
    DEPT_SALARIES: deptBudget,

    //roles
    ADD_ROLE: addRole,
    REMOVE_ROLE: removeRole,
    VIEW_ROLES: viewRole,

    //exit process
    QUIT: quit,
    default: quit,
  };
  if (chosen) {
    console.log(`list[chosen] = ${list[chosen]}`);
    await list[chosen]();
  } else {
    list["default"];
  }
}

module.exports = dispatchOne;
