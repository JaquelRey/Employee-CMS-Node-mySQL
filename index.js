const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');
const db = require('./db');
const queries = require('./queries')

const start = () => {
    const logoart = logo({ name: 'Employee Manager' }).render()
    console.log(logoart)

    callStack ()
}

let dispatchOne = (chosen) => {
    let list = {
        //employee
        'ADD_EMP': addEmp(),
        'REMOVE_EMP': removeEmp(),
        'VIEW_EMP': viewAllEmp(),
        'VIEW_EMP_BY_DEPT': viewEmpByDept(),
        'VIEW_EMP_BY_MANAGER': viewEmpByManager(),
        'UPDATE_EMP_ROLE': updateEmpRole(),
        'UPDATE_EMP_MANAGER': updateEmpManager(),
        //department
        'ADD_DEPT': addDept(),
        'REMOVE_DEPT': removeDept(),
        'VIEW_DEPTS': viewDepts(),
        'DEPT_SALARIES': deptBudget(),
        //roles
        'ADD_ROLE': addRole(),
        'REMOVE_ROLE': removeRole(),
        'VIEW_ROLES': viewRoles(),
        '': QUIT()
    }
    return list[chosen]
}

async function startStack() {
    prompt([ queries ]).then(res => {
      let chosen = res.choice
      // dispatch table for user choice
      dispatchOne(chosen)
    }
    )
  }