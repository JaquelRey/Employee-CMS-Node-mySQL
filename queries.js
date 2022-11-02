const db = require('./db')

// return all employees and their data
const viewEmp = async () => {
  const [rows] = await db.viewAllEmps()
  const employees = rows
  return employees
}
// return all departments and their data
const viewDepts = async () => { 
  const [rows] = await db.viewAllDepts()
  const departments = rows
  return departments
 }
// return all roles and their data
const viewRoles = async () => { 
  const [rows] = await db.viewAllRoles()
  const roles = rows
  return roles
}
//return all managers and their data
const viewManagers = async () => {
  const [rows] = await db.viewAllManagers()
  const managers = rows
  return managers
}

// choices to populate prompts, mapped from above data returns
// return readable lists for user selections
const empChoices = async () => { 
  const choices = await viewEmp()
  return Promise.all(choices.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  })))
}

const deptChoices = async () => { 
  let choices = await viewDepts.map(({ id, name }) => ({
    name: name,
    value: id
  }))
  return choices
}

const roleChoices = async () => { 
  let choices = await viewRoles.map(({ id, title }) => ({
  name: title,
  value: id
}))
  return choices
}

const managerChoices = async () => { 
  const choices = viewManagers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }))
  return choices
}

const choiceResolver = async (mapped, value) => {
  
}


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
    name: "first",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "last",
    message: "What is the employee's last name?"
  }
]

// 1. choose new emp role
// 2. update emp role
// 3. new role
// 4. remove role
const roleQuery = [{
  type: "list",
  name: "roleId",
  message: "What is the employee's role?",
  choices: await roleChoices()
}, 
{
  type: "list",
  name: "roleId",
  message: "Which role do you want to assign the selected employee?",
  choices: await roleChoices()
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
    name: "department_id",
    message: "Which department does the role belong to?",
    choices: await deptChoices()
  }
],
{
  type: "list",
  name: "roleId",
  message:
    "Which role do you want to remove? (Warning: This will also remove employees)",
  choices: await roleChoices()
}]

// 1. choose new emp manager
// 2. update emp manager
// 3. view emp by manager
const managerQuery = [{
  type: "list",
  name: "managerId",
  message: "Who is the employee's manager?",
  choices: await managerChoices()
},
{
  type: "list",
  name: "managerId",
  message:
    "Which employee do you want to set as manager for the selected employee?",
  choices: await managerChoices()
},
{
  type: "list",
  name: "managerId",
  message: "Which manager's team would you like to view?",
  choices: await managerChoices()
}]
// 1. select emp to remove
// 2. select emp to update
// 3. select emp to update manager
const empQuery = [{
  type: "list",
  name: "employeeId",
  message: "Which employee do you want to remove?",
  choices: await empChoices()
},
{
  type: "list",
  name: "employeeId",
  message: "Which employee's role do you want to update?",
  choices: await empChoices()
},
{
  type: "list",
  name: "employeeId",
  message: "Which employee's manager do you want to update?",
  choices: await empChoices()
}]

// 1. view emp by dept
// 2. add new dept
// 3. remove dept
const deptQuery = [{
  type: "list",
  name: "departmentId",
  message: "Which department would you like to see employees for?",
  choices: await deptChoices()
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
  choices: await deptChoices()
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
