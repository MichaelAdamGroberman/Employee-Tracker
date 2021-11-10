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
  let sql = `SELECT * FROM DEPARTMENT`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('Departments'));
    console.log(line);
    console.table(response);
    console.log(line);
    main();
  });
};

// View all Roles
const viewAllRoles = () => {
  let sql = `SELECT role.id, role.title, department.name FROM role INNER JOIN department ON role.department_id = department.id`;
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
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department_id AS 'department', role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('.... viewing all Employees'));
    console.log(line);
    console.table(response);
    console.log(line);
    main();
  });
};

// Add new Department
const addDepartment = () => {
  console.clear();
  console.log(chalk.blue.bold('Adding New Department'));
  console.log(line);
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the Department Name?',
      },
    ])
    .then((answer) => {
      const department = answer.department;
      let sql = `INSERT INTO department (name) VALUES ("${department}")`;
      connection.query(sql, answer, (error, response) => {
        if (error) throw error;
        console.log(`${answer}` + ` department created successfully!`);
        console.log(line);
        viewAllDepartments();
      });
    });
};
// Add new Role
const addRole = () => {
  console.clear();
  console.log(chalk.blue.bold('Adding New Employee Role'));
  console.log(line);
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the Role Title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the annual salary for this role?',
      },
      {
        name: 'departmentID',
        type: 'input',
        message: 'What is the Department ID for this Role?',
      },
    ])
    .then((answer) => {
      const title = answer.title;
      const salary = answer.salary;
      const departmentID = answer.departmentID;
      let sql = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      connection.query(sql, answer, (error, response) => {
        if (error) throw error;
        console.log(`${answer}` + ` department created successfully!`);
        console.log(line);
        viewAllDepartments();
      });
    });
};
// Add new Employee
const addEmployee = () => {};
// Update existing employee
const updateEmployee = () => {};

main();
