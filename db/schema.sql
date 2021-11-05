-- drop DATABASE and continue code if 'employee_db' already exists;
DROP DATABASE IF EXISTS employee_db;

-- create Database is employee_db does not exist
CREATE DATABASE employee_db;

-- use newly created db
USE employee_db;

-- create a table to store the department data
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
-- create TABLE for role data; include:[id,title,salary,department_id, FOREIGN KEY]
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL.
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE
    SET
        NULL
);
-- create table to store employee data; include: [id,first_name,last_name,role_id, manager_id, and a foreign key]
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firt_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) REFERNCES role(id) ON DELETE
    SET
        NULL,
        FOREIGN KEY (role_id) REFERENCES employee(id) ON DELETE
    SET
        NULL
);