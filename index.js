const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
//require('console.table');

const database = require('./database');
//const queries = require('./queries')

const { toEnum } = require('./utils');

const COMMANDS = {
    EMPLOYEES_VIEW                                             /**/: undefined,
    EMPLOYEES_VIEW_BY_DEPARTMENT                               /**/: undefined,
    EMPLOYEES_VIEW_BY_MANAGER                                  /**/: undefined,
    EMPLOYEES_ADD                                              /**/: undefined,
    EMPLOYEES_REMOVE                                           /**/: undefined,
    EMPLOYEES_UPDATE_ROLE                                      /**/: undefined,
    EMPLOYEES_UPDATE_MANAGER                                   /**/: undefined,
    ROLES_VIEW                                                 /**/: undefined,
    ROLES_ADD                                                  /**/: undefined,
    ROLES_REMOVE                                               /**/: undefined,
    DEPARTMENTS_VIEW                                           /**/: undefined,
    DEPARTMENTS_ADD                                            /**/: undefined,
    DEPARTMENTS_REMOVE                                         /**/: undefined,
    DEPARTMENTS_VIEW_SALARIES                                  /**/: undefined,
    QUIT                                                       /**/: undefined,
}
toEnum(COMMANDS);

const QUERY_LIST = Object.freeze({
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
        // {
        //     name: "View employees",
        //     value: COMMANDS.EMPLOYEES_VIEW,
        // },
        // {
        //     name: "View employees by department",
        //     value: COMMANDS.EMPLOYEES_VIEW_BY_DEPARTMENT,
        // },
        // {
        //     name: "View employees by manager",
        //     value: COMMANDS.EMPLOYEES_VIEW_BY_MANAGER,
        // },
        // {
        //     name: "Add employee",
        //     value: COMMANDS.EMPLOYEES_ADD,
        // },
        // {
        //     name: "Remove employee",
        //     value: COMMANDS.DEPARTMENTS_REMOVE,
        // },
        // {
        //     name: "Update Employee Role",
        //     value: COMMANDS.EMPLOYEES_UPDATE_ROLE,
        // },
        // {
        //     name: "Update Employee Manager",
        //     value: COMMANDS.EMPLOYEES_UPDATE_MANAGER,
        // },
        // {
        //     name: "View All Roles",
        //     value: COMMANDS.ROLES_VIEW,
        // },
        // {
        //     name: "Add Role",
        //     value: COMMANDS.ROLES_ADD,
        // },
        // {
        //     name: "Remove Role",
        //     value: COMMANDS.ROLES_REMOVE,
        // },
        // {
        //     name: "View All Departments",
        //     value: COMMANDS.DEPARTMENTS_VIEW,
        // },
        // {
        //     name: "Add Department",
        //     value: COMMANDS.DEPARTMENTS_ADD,
        // },
        // {
        //     name: "Remove Department",
        //     value: COMMANDS.DEPARTMENTS_REMOVE,
        // },
        // {
        //     name: "View Total Utilized Budget By Department",
        //     value: COMMANDS.DEPARTMENTS_VIEW_SALARIES,
        // },
        {
            name: "Quit",
            value: COMMANDS.QUIT,
        },
    ],
});
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