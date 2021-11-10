USE employee_tracker;

INSERT INTO department(name)
VALUES('IT'), ('Finance'), ('HR'), ('Legal'), ('Executive');

INSERT INTO role(title, salary, department_id)
VALUES('Specialist', 50000, 1), ('Manager', 75000, 1), ('Director', 100000, 1), ('CTO', 240000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Michael', 'Groberman', 4, null), ('Mike','Adams',3,1),('Matt','Zecat',2,2),('John','Adams',1,3);

UPDATE `employee_tracker`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');