const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
                console.info('Bye Bye');
                process.exit();
        }
    })
}

const viewAllEmployee = () => {

    db.query('SELECT E1.id, E1.first_name, E1.last_name, role.title, department.department_name AS department, role.salary, CONCAT(E2.first_name," ",E2.last_name) AS manager FROM ((employee E1 LEFT JOIN employee E2 ON E1.manager_id = E2.id)JOIN role ON E1.role_id = role.id) JOIN department ON role.department_id = department.id;' , (err, data) => {
        if(err) {
            throw err;
        };
        console.log('\n');
        console.table(data);
        start();
    })
}

const addEmployee = () => {

}

const updateEmployeeRole = () => {

}

const viewAllRoles = () => {
    db.query('SELECT role.id AS id, role.title AS title, department.department_name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;', (err,data) => {
        if(err) {
            throw err;
        };
        console.log('\n');
        console.table(data);
        start();
    })
}

const addRole = () => {

}

const viewAllDepartments = () => {
    db.query('SELECT department.id as id, department_name AS department FROM department;', (err,data) => {
        if(err) {
            throw err;
        };
        console.log('\n');
        console.table(data);
        start();
    })
}

const addDepartment = () => {
    
}
start();