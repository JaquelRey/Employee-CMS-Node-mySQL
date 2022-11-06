const { Promise } = require("./connection");
const {
  ManagerDb,
  EmpDb,
  RoleDb,
  DepartmentDb,
} = require("./connections/index");

// return all employees and their data
const viewEmp = async () => {
  const [rows] = await EmpDb.viewAllEmps();
  const employees = rows;
  return employees;
};
// return all departments and their data
const viewDepts = async () => {
  const [rows] = await DepartmentDb.viewAllDepts();
  const departments = rows;
  return departments;
};
// return all roles and their data
const viewRoles = async () => {
  const [rows] = await RoleDb.viewAllRoles();
  const roles = rows;
  return roles;
};
//return all managers and their data
const viewManagers = async () => {
  const [rows] = await ManagerDb.viewAllManagers();
  const managers = rows;
  return managers;
};

// choices to populate prompts,
// mapped from above data returns
async function empChoices() {
  console.log("\n");
  console.log(`empChoices...`);
  console.log("\n");
  await viewEmp().then((emps) => {
    emps.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    })).then((res) => {
      return res
    })
  })
}
async function deptChoices() {
  console.log("\n");
  console.log(`deptChoices...`);
  console.log("\n");
  await viewDepts().then((depts) => {
    depts.map(({ id, name }) => ({
      name: name,
      value: id,
    })).then((res) => {
      console.log(res)
      return res
    })
  })
}

async function roleChoices() {
  console.log("\n");
  console.log(`roleChoices...`);
  console.log("\n");
  await viewRoles().then((roles) => {
    roles.map(({ id, title }) => ({
      name: title,
      value: id,
    })).then((res) => {
      return res
    })
  }
  )
}

async function managerChoices() {
  console.log("\n");
  console.log(`managerChoices...`);
  console.log("\n");
  await viewManagers().then((managers) => {
    managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    })).then((res) => {
      return res
    })
  }
  )
}


  // return readable lists for user selections
  async function inquirerChoices(type) {
    if (type === "employees") {
      return empChoices
    } else if (type === "roles") {
      return roleChoices
    } else if (type === "departments") {
      return deptChoices
    } else if (type === "manager") {
      return managerChoices
    }
  }

  module.exports = {
    inquirerChoices,
    viewEmp,
    viewDepts,
    viewRoles,
    viewManagers,
  };
