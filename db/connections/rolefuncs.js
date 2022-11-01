const connection = require("./connection");

class RoleDb {
  constructor(connection) {
    this.connection = connection;
  }

  // role functions with mysql2 promise function
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
}

module.exports = new RoleDb(connection);
