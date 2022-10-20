use employees;

INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
    
INSERT INTO role(title, salary, department_id)
VALUES
    ('Sales Lead', 50000, 1),
    ('Salesperson', 40000, 1),
    ('Lead Engineer', 100000, 2),
    ('Software Engineer', 80000, 2),
    ('Account Manager', 80000, 3),
    ('Accountant', 95000, 3),
    ('Legal Team Lead', 160000, 4),
    ('Lawyer', 150000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Dewey', 'Duck', 1, 5),
    ('Huey', 'Duck', 2, 5),
    ('Louey', 'Duck', 3, 5),
    ('McScrooge', 'McDuck', 4, NULL),
    ('Donald', 'Duck', 5, NULL),
    ('Launchpad', 'McQuack', 6, 4),
    ('Gyro', 'Gearloose', 7, 4),
    ('Bentina', 'Beakley', 8, 4)
    ('Webby', 'Vanderquack', 8, 8);
