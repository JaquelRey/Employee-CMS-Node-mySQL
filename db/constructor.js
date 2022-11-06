// dependency 
const inquirer = require('inquirer')
const { nameQuery, roleQuery, managerQuery } = require('../queries')
const  NewDept  = require("./lib/department")
const  NewRole  = require("./lib/role")
const  NewEmp  = require("./lib/employee")
// class constructors

async function newEmployee() {
    const name = await inquirer.prompt(nameQuery);
    const role = await inquirer.prompt(roleQuery[0]);
    const manager = await inquirer.prompt(managerQuery[0]);
    console.log("\n");
    console.log(`Adding ${name.first} ${name.last} as a new employee...`);
    console.log("\n");
    return Promise.resolve(new NewEmp(name.first, name.last, manager, role))
}

async function newRole() {
    const answer = await inquirer.prompt(roleQuery[2]);
    let { title, salary, dept } = answer
    console.log("\n");
    console.log(`Adding ${title} role...`);
    console.log("\n");
    return Promise.resolve(new NewRole(title, salary, dept))
}

async function newDepartment() {
    const name = await inquirer.prompt(deptQuery[1]);

    return Promise.resolve(new NewDept(name))
}

module.exports = {newEmployee, newDepartment, newRole}