const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'd1Uh$0r#6',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

const start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role','View All Departments','Add Department','Quit']
        }
    ]).then( data => {
        switch (data.start) {
            case 'View All Employees':
                viewAllEmployee();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            default:
                console.info('Bye Bye')
                break;
        }
    })
}

const viewAllEmployee = () => {
    const sql = 'SELECT * FROM employee';
    console.log('All Employees');
    console.table(sql);
    start();
}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

const viewAllRoles = () => {

}

const addRole = () => {

}

const viewAllDepartments = () => {

}

const addDepartment = () => {

}
start();