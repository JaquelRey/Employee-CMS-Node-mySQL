const connection = require("../connection")

class DepartmentDb {
  constructor(connection) {
    this.connection = connection;
  }

  // department functions with mysql2 promise function
  // view emp by dept, create dept, remove dept
  // view depts, view total sum of dept salaries

  viewEmpsByDept(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }

  addDepts(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  removeDepts(departmentId) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", departmentId);
  }

  viewAllDepts() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  viewDeptBudgets() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
      );
  }
}

module.exports = new DepartmentDb(connection);
