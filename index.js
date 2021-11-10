const connection = require('./config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');
require('console.table');

const line = '-'.repeat(process.stdout.columns);

connection.connect((err) => {
  if (err) throw error;
  console.log('Successfully connected to MYSQL Server!');
  console.log(chalk.blueBright.bold('Employee Tracker'));
  console.log(chalk.blueBright.italic('Developed by Michael Adam Groberman'));
  main();
});

const main = () => {
  inquirer
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
      const { choice } = answer;
      if (choice === 'View All Departments') {
        viewAllDepartments();
      }
      if (choice === 'View All Roles') {
        viewAllRoles();
      }
      if (choice === 'View All Employees') {
        viewAllEmployees();
      }
      if (choice === 'Add a New Department') {
        addDepartment();
      }
      if (choice === 'Add a New Role') {
        addRole();
      }
      if (choice === 'Add a New Employee') {
        addEmployee();
      }
      if (choice === 'Updating Existing Employee') {
        updateEmployee();
      }
      if (choice === 'Quit') {
        connection.end();
      }
    });
};

// View all Departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.clear();
    console.log(chalk.blue.bold('Departments'));
    console.log(response);
    console.log(line);
    main();
  });
};

// View all Roles
const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title, department.department_name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;
  connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    response.forEach((role) => {
      console.log(role.title);
    });
    console.clear();
    console.log(chalk.blue.bold('Roles'));
    console.log(response);
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
    console.log(chalk.blue.bold('Employees:'));
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
