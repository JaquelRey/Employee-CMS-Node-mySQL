const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // connection functions with promise wrapper
  // ideally I could make these smaller modules by type, but not rn

  // employee functions
  // create new, update, remove, update manager
  // view employees, view by dept, view by manager

  addEmp(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  updateEmp(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  removeEmp(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }

  updateEmpManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  viewAllEmp() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  viewEmpByDept(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }

  viewEmpByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }

  // view managers

  viewManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  // role functions
  // create role, remove role, view roles

  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  removeRole(roleId) {
    return this.connection
      .promise()
      .query("DELETE FROM role WHERE id = ?", roleId);
  }

  viewRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  // department functions
  // create dept, remove dept
  // view depts, view total sum of dept salaries

  addDept(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  removeDept(departmentId) {
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

module.exports = new DB(connection);
