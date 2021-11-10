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

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'r00t!p@s$',
    database: 'employee_tracker',
  },
  console.log('Successfully connected to MYSQL Server!')
);

app.use((request, response) => {
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
      let choices = answer.mainMenu;
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
  let sql = `SELECT * FROM DEPARTMENTS`;
  connection.query(sql, (error, response) => {
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
  let sql = `SELECT roles.id, roles.title, departments.name FROM roles INNER JOIN departments ON roles.department_id = departments.id`;
  connection.query(sql, (error, response) => {
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
  let sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department_id AS 'department', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC`;
  connection.query(sql, (error, response) => {
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
  console.clear();
  console.log(chalk.blue.bold('Adding New Department'));
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the Department Name?',
      },
    ])
    .then((answer) => {
      const depName = answer.newDepartment;
      let sql = `INSERT INTO departments (departments_name) VALUES (?)`;
      connection.query(sql, answer.departmentName, (error, response) => {
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
