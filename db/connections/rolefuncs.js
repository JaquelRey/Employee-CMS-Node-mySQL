const connection = require("../connection");
const DB = require("./database");

class RoleDb extends DB {
  // role functions with mysql2 promise function
  // create role, remove role, view roles

  addRoles(role) {
    return connection.query("INSERT INTO role SET ?", role);
  }

  removeRoles(roleId) {
    return connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  viewAllRoles() {
    return connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }
}

module.exports = new RoleDb(connection);
