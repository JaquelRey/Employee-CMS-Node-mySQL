const db = require('./db')

// find items in db
const viewEmp = async () => {
  const [rows] = await db.viewAllEmps()
  const employees = rows
  return employees
}

const viewDepts = async () => {
  const [rows] = await db.viewAllDepts()
  const departments = rows
  return departments
}

const viewRoles = async () => {
  const [rows] = await db.viewAllRoles()
  const roles = rows
  return roles
}

// choices to populate prompts
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

const choiceResolver = async (type) => { }

const nameQuery = [
  {
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    name: "last_name",
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
    name: "title",
    message: "What is the name of the role?"
  },
  {
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
  message: "Which employee do you want to see direct reports for?",
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
