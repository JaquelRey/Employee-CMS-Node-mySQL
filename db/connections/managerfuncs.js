const connection = require("../connection");

export class ManagerDb {
  constructor(connection) {
    this.connection = connection;
  }

  // manager functions using mySQL2 promise constructor

  // create new, update, remove, update manager
  // view employees, view by dept, view by manager, view manager

  viewEmpsByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }

  viewAllManagers() {
    return this.connection
      .promise()
      .query("SELECT id, first_name, last_name FROM employee WHERE id != ?");
  }
}

module.exports = new ManagerDb(connection);
