const inquirer = require('inquirer');
const chalk = require('chalk');
require('console.table');
const express = require('express');
const mysql = require('mysql2');
const line = '-'.repeat(process.stdout.columns);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sql = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'r00t!p@s$',
    database: 'employee_tracker',
  },
  console.log('Successfully connected to MYSQL Server!')
);

app.use((req, res) => {
  res.status(404).end();
});

const main = () => {
  console.log(chalk.blueBright.bold('Employee Tracker'));
  console.log(chalk.blueBright.italic('Developed by Michael Adam Groberman'));
  console.log(line);
  return inquirer
    .prompt([
      {
        name: 'mainMenu',
        type: 'list',
        message: 'Please select an option from the main menu:',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a New Department',
          'Add a New Role',
          'Add a New Employee',
          'Updating Existing Employee',
          'Quit',
        ],
      },
    ])
    .then((answer) => {
      let choices = answer.options;
      switch (choices) {
        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Add a New Department':
          addDepartment();
          break;

        case 'Add a New Role':
          addRole();
          break;

        case 'Add a New Employee':
          addEmployee();
          break;

        case 'Updating Existing Employee':
          updateEmployee();
          break;

        case 'Quit':
          connection.end();
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

// View all Departments
const viewAllDepartments = () => {
  const sql = `SELECT * FROM DEPARTMENT`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('Departments'));
    console.table(response);
    console.log(line);
    main();
  });
};

// View all Roles
const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title, department.name FROM role INNER JOIN department ON role.department_id`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('.... viewing all Company Roles'));
    console.table(response);
    console.log(line);
    main();
  });
};
// View all Employees
const viewAllEmployees = () => {
  let sql = `SELECT employee.id, 
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.department_name AS 'department', 
                  role.salary
                  FROM employee, role, department 
                  WHERE department.id = role.department_id 
                  AND role.id = employee.role_id
                  ORDER BY employee.id ASC`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('.... viewing all Employees'));
    console.table(response);
    console.log(line);
    main();
  });
};

// Add new Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the Department Name?',
        validate: validate.validateString,
      },
    ])
    .then((answer) => {
      let sql = `INSERT INTO department (department_name) VALUES (?)`;
      connection.query(sql, answer.newDepartment, (error, response) => {
        if (error) throw error;
        console.log(
          chalk.brightGreen(
            answer.newDepartment + ` Department created successfully!`
          )
        );
        console.log(line);
        viewAllDepartments();
      });
    });
};
// Add new Role
const addRole = () => {};
// Add new Employee
const addEmployee = () => {};
// Update existing employee
const updateEmployee = () => {};

main();
