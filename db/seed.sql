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
    ('Bentina', 'Beakley', 7, NULL),
    ('McScrooge', 'McDuck', 1, NULL),
    ('Donald', 'Duck', 3, NULL),
    ('Dewey', 'Duck', 2, 3),
    ('Huey', 'Duck', 2, 3),
    ('Louey', 'Duck', 2, 3),
    ('Launchpad', 'McQuack', 3, 2),
    ('Gyro', 'Gearloose', 4, 2),
    ('Webby', 'Vanderquack', 8, 1);
