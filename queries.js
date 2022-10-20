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

module.exports = queries;
