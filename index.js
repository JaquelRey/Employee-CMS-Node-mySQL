const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');
const db = require('./db');
const queries = require('./queries')

//destructuring db funcs 
const { addEmps, updateEmps, removeEmps,
    updateEmpsManager, viewAllEmps, viewEmpsByDept,
    viewEmpsByManager, viewManagers,
    addRoles, removeRoles, viewAllRoles,
    addDepts, viewAllDepts, viewDeptBudgets } = db

// exit process
const QUIT = () => {
    console.log("Goodbye!")
    process.exit()
}

const start = async () => {
    const logoart = logo({ name: 'Employee Manager' }).render()
    console.log(logoart)
    return await callStack()
}

const dispatchOne = async (chosen) => {
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
    }
    return (chosen ? list[chosen] : list['default'])
}



const userChoices = async () => {
    const query = await prompt([queries])
    const chosen = query.choice
    // dispatch table selects next action
    return dispatchOne(chosen)
}


// func that will begin process
const callStack = async () => {
    return await userChoices().then(
        callStack()
    )
}
// do I need another await on callStack??


// employee funcs


const addEmp = () => {

}

const removeEmp = async () => {
    const answer = await prompt(empQuery[0])
    return Promise.resolve(removeEmps(answer.employeeId))
}

const updateEmpRole = () => { }

const updateEmpManager = () => { }

const viewEmpByDept = () => { }

const viewEmpByManager = () => { }


// department funcs
const addDept = () => { }

const removeDept = () => { }

const deptBudget = () => { }


// role funcs
const addRole = () => { }

const removeRole = () => { }

start()