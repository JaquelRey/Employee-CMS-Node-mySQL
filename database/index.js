const databaseConfig = require('../configs/database.js');

const mysql = require("./mysql.js");
const sqlite = require("./sqlite.js");

async function connect({ verbose }) {
  const log = (_) => verbose && console.log(_);

  try {
    log('Connecting to MySQL Database...');
    const connection = await mysql.init(databaseConfig.mysql);
    log('Connected to MySQL server.');
    return connection;
  } catch (_error) {
    log('Could not connect to MySQL server!');
  }
  try {
    log('Connecting to SQLite Database...');
    const connection = sqlite.init(databaseConfig.sqlite);
    log('Connected to SQLite server.');
    return connection;
  } catch (_error) {
    log('Could not connect to SQLite server!');
  }
  throw ('Unable to connect to database.');
}

exports.connect = connect;

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // connection functions with mysql2 promise function
  // ideally I could make these smaller...

  // employee functions

  // create new, update, remove, update manager
  // view employees, view by dept, view by manager, view manager

  addEmps(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  updateEmps(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  removeEmps(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }

  updateEmpsManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  viewAllEmps() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  viewEmpsByDept(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }

  viewEmpsByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }

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

  addRoles(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  removeRoles(roleId) {
    return this.connection
      .promise()
      .query("DELETE FROM role WHERE id = ?", roleId);
  }

  viewAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  // department functions
  // create dept, remove dept
  // view depts, view total sum of dept salaries

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
