const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
//require('console.table');

const database = require('./database');
//const queries = require('./queries')

const { toEnum } = require('./utils');

//destructuring db funcs 
const { addEmps, updateEmps, removeEmps,
    updateEmpsManager, viewAllEmps, viewEmpsByDept,
    viewEmpsByManager, viewManagers,
    addRoles, removeRoles, viewAllRoles,
    addDepts, viewAllDepts, viewDeptBudgets } = db

// exit process
function QUIT() {
    console.log("Goodbye!");
    process.exit();
}

async function start() {
    const logoart = logo({ name: 'Employee Manager' }).render();
    console.log(logoart);
    return await callStack();
}

function dispatchOne(chosen) {
    const list = {
        //employee
        'ADD_EMP': addEmp(),
        'REMOVE_EMP': removeEmp(),
        'VIEW_EMP': viewAllEmps(),
        'VIEW_EMP_BY_DEPT': viewEmpByDept(),
        'VIEW_EMP_BY_MANAGER': viewEmpByManager(),
        'UPDATE_EMP_ROLE': updateEmpRole(),
        'UPDATE_EMP_MANAGER': updateEmpManager(),

        //department
        'ADD_DEPT': addDept(),
        'REMOVE_DEPT': removeDept(),
        'VIEW_DEPTS': viewAllDepts(),
        'DEPT_SALARIES': deptBudget(),

        //roles
        'ADD_ROLE': addRole(),
        'REMOVE_ROLE': removeRole(),
        'VIEW_ROLES': viewAllRoles(),

        //exit process
        'QUIT': QUIT(),
        default: QUIT()
    };
    return (chosen ? list[chosen] : list['default']);
}

async function userChoices() {
    const query = await prompt([queries]);
    const chosen = query.choice;
    // dispatch table selects next action
    return dispatchOne(chosen);
}

// func that will begin process
async function callStack() {
    return await userChoices().then(
        callStack()
    );
}
// do I need another await on callStack??


// employee funcs


function addEmp() { }

async function removeEmp() {
    const answer = await prompt(empQuery[0]);
    return Promise.resolve(removeEmps(answer.employeeId));
}

function updateEmpRole() { }

function updateEmpManager() { }

function viewEmpByDept() { }

function viewEmpByManager() { }


// department funcs
function addDept() { }

function removeDept() { }

function deptBudget() { }


// role funcs
function addRole() { }

function removeRole() { }

start();