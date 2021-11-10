-- drop DATABASE and continue code if 'employee_db' already exists;
DROP DATABASE IF EXISTS employee_tracker;

-- create Database is employee_db does not exist
CREATE DATABASE employee_tracker;

-- use newly created db
USE employee_tracker;

-- create a table to store the department data
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
-- create TABLE for role data; include:[id,title,salary,department_id, FOREIGN KEY]
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
-- create table to store employee data; include: [id,first_name,last_name,role_id, manager_id, and a foreign key]
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    role_id INT, 
    FOREIGN KEY (role_id) REFERENCES roles(id)
);