const connection = require('./config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');
require('console.table');

connection.connect((err) => {
  if (err) throw err;
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
        updateUser();
      }
      if (choice === 'Quit') {
        connection.end();
      }
    });
};
