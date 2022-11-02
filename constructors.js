// not finished here

export class NewEmp {
  constructor(first, last, manager, role) {
    this.first_name = first;
    this.last_name = last;
    this.role_id = role;
    this.manager_id = manager;
  }
}

export class NewRole {
    constructor(title, salary, dept) {
      this.title = title;
      this.salary = salary;
      this.department_id = dept;
    }
  }

  export class NewDept {
    constructor(name) {
      this.name = name;
    }
  }
