const {inquirerChoices} = require("./db/selection");

const queries = {
  type: "list",
  name: "choice",
  message: "What would you like to do?",
  choices: [
    {
      name: "View employees",
      value: "VIEW_EMP",
    },
    {
      name: "View employees by department",
      value: "VIEW_EMP_BY_DEPT",
    },
    {
      name: "View employees by manager",
      value: "VIEW_EMP_BY_MANAGER",
    },
    {
      name: "Add employee",
      value: "ADD_EMP",
    },
    {
      name: "Remove employee",
      value: "REMOVE_EMP",
    },
    {
      name: "Update Employee Role",
      value: "UPDATE_EMP_ROLE",
    },
    {
      name: "Update Employee Manager",
      value: "UPDATE_EMP_MANAGER",
    },
    {
      name: "View All Roles",
      value: "VIEW_ROLES",
    },
    {
      name: "Add Role",
      value: "ADD_ROLE",
    },
    {
      name: "Remove Role",
      value: "REMOVE_ROLE",
    },
    {
      name: "View All Departments",
      value: "VIEW_DEPTS",
    },
    {
      name: "Add Department",
      value: "ADD_DEPT",
    },
    {
      name: "Remove Department",
      value: "REMOVE_DEPT",
    },
    {
      name: "View Total Utilized Budget By Department",
      value: "DEPT_SALARIES",
    },
    {
      name: "Quit",
      value: "QUIT",
    },
  ],
};

const nameQuery = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
  }
]

// 0. choose new emp role
// 1. update emp role
// 2. new role
// 3. remove role
const roleQuery = [{
  type: "list",
  name: "roleId",
  message: "What is the employee's role?",
  choices: inquirerChoices('role')
}, 
{
  type: "list",
  name: "roleId",
  message: "Which role do you want to assign the selected employee?",
  choices: inquirerChoices('role')
},
[
  { 
    type: "input",
    name: "title",
    message: "What is the name of the role?"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role?"
  },
  {
    type: "list",
    name: "departmentId",
    message: "Which department does the role belong to?",
    choices: inquirerChoices('department')
  }
],
{
  type: "list",
  name: "roleId",
  message:
    "Which role do you want to remove? (Warning: This will also remove employees)",
  choices: inquirerChoices('role')
}]

// 0. choose new emp manager
// 1. update emp manager
// 2. view emp by manager
const managerQuery = [{
  type: "list",
  name: "managerId",
  message: "Who is the employee's manager?",
  choices: inquirerChoices('manager')
},
{
  type: "list",
  name: "managerId",
  message:
    "Which employee do you want to set as manager for the selected employee?",
  choices: inquirerChoices('manager')
},
{
  type: "list",
  name: "managerId",
  message: "Which manager's team would you like to view?",
  choices: inquirerChoices('manager')
}]
// 0. select emp to remove
// 1. select emp to update
// 2. select emp to update manager
const empQuery = [{
  type: "list",
  name: "employeeId",
  message: "Which employee do you want to remove?",
  choices: inquirerChoices('employee')
},
{
  type: "list",
  name: "employeeId",
  message: "Which employee's role do you want to update?",
  choices: inquirerChoices('employee')
},
{
  type: "list",
  name: "employeeId",
  message: "Which employee's manager do you want to update?",
  choices: inquirerChoices('employee')
}]

// 0. view emp by dept
// 1. add new dept
// 2. remove dept
const deptQuery = [{
  type: "list",
  name: "departmentId",
  message: "Which department would you like to see employees for?",
  choices: inquirerChoices('department')
},
{
  type: "input",
  name: "name",
  message: "What is the name of the department?"
},
{
  type: "list",
  name: "departmentId",
  message:
    "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
  choices: inquirerChoices('department')
},


]

module.exports = {
  queries: queries, 
  nameQuery: nameQuery, 
  roleQuery: roleQuery, 
  managerQuery: managerQuery, 
  empQuery: empQuery, 
  deptQuery: deptQuery
}
