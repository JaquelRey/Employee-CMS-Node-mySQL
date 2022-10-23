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

function dispatchQuery(query) {
    switch (query.choice) {
        case COMMANDS.EMPLOYEES_VIEW:
            break;
        case COMMANDS.EMPLOYEES_VIEW_BY_DEPARTMENT:
            break;
        case COMMANDS.EMPLOYEES_VIEW_BY_MANAGER:
            break;
        case COMMANDS.EMPLOYEES_ADD:
            break;
        case COMMANDS.EMPLOYEES_REMOVE:
            break;
        case COMMANDS.EMPLOYEES_UPDATE_ROLE:
            break;
        case COMMANDS.EMPLOYEES_UPDATE_MANAGER:
            break;
        case COMMANDS.ROLES_VIEW:
            break;
        case COMMANDS.ROLES_ADD:
            break;
        case COMMANDS.ROLES_REMOVE:
            break;
        case COMMANDS.DEPARTMENTS_VIEW:
            break;
        case COMMANDS.DEPARTMENTS_ADD:
            break;
        case COMMANDS.DEPARTMENTS_REMOVE:
            break;
        case COMMANDS.DEPARTMENTS_VIEW_SALARIES:
            break;
        case COMMANDS.QUIT:
        default:
            return quit();
    }
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}

async function displayUserChoices() {
    return dispatchQuery(await prompt([QUERY_LIST]));
}

(async function () {
    const db = await database.connect({ verbose: false });
    console.log(logo({ name: 'Employee Manager' }).render());
    await displayUserChoices();
}());

//destructuring db funcs 
const { addEmps, updateEmps, removeEmps,
    updateEmpsManager, viewAllEmps, viewEmpsByDept,
    viewEmpsByManager, viewManagers,
    addRoles, removeRoles, viewAllRoles,
    addDepts, viewAllDepts, viewDeptBudgets } = db

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