const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
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
    inquirer.prompt([
        {
            type:"input",
            name:"first",
            message: "What is your first name?"
        },
        {
            type:"input",
            name:"last",
            message: "What is your last name?"
        }
    ]).then(name => {
        db.query('SELECT role.title, role.id FROM role', (err, rol) => {
            if(err) {
                throw err;
            };
            inquirer.prompt([
                {
                    type: 'list',
                    name: "rolename",
                    message: "Which role do you belong to?",
                    choices: rol.map((role)=>role.title)
                }
            ]).then(rolans => {
                db.query('SELECT first_name,last_name, id FROM employee', (err, man) => {
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manName',
                            message: "What is your manager's name?",
                            choices: man.map((employee)=>`${employee.first_name} ${employee.last_name}`)
                        }
                    ]).then(manNa => {
                        const rolId = rol.filter((dat) => dat.title === rolans.rolename)[0].id;
                        const manId = man.filter((data) => `${data.first_name} ${data.last_name}` === manNa.manName)[0].id;
                        db.query('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[name.first,name.last,rolId,manId],(err,ans)=> {
                            if(err) {
                                throw err;
                            };
                            console.log('\nEmployee has been added');
                            start();
                        })
                        
                    })
                })
            })
        })
    })
}

const updateEmployeeRole = () => {
    db.query('SELECT first_name, last_name, id FROM employee', (err,res) => {
        if(err) {
            throw err;
        };
        inquirer.prompt([
            {
                type: 'list',
                name:'name',
                message: 'Who do you want to update?',
                choices: res.map((employee)=> `${employee.first_name} ${employee.last_name}`)
            }
        ]).then(data => {
            db.query('SELECT title, id FROM role', (err,res2)=> {
                if(err) {
                    throw err;
                }
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'What role do you want now?',
                        choices: res2.map((role)=> role.title)
                    }
                ]).then(data2 => {
                    const empId = res.filter((name1)=>`${name1.first_name} ${name1.last_name}`===data.name)[0].id;
                    const roleId = res2.filter((role1)=> role1.title === data2.newRole)[0].id;
                    db.query('UPDATE employee SET role_id = (?) WHERE id = (?)',[roleId,empId],(err,result)=> {
                        if(err) {
                            throw err;
                        }
                        console.log('\nRole Updated');
                        start();
                    })
                })
            })
        })
    })
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
    db.query('SELECT department_name, id FROM department;', (err,res) =>
    {
        if(err) {
            throw err;
        };
        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the name of the role?",
        },
        {
            type: "number",
            name: "salary",
            message: "How much is the salary?"
        },
        {
            type: "list",
            name: "department",
            message: "What department is this role in?",
            choices: res.map((department)=> department.department_name)
        }
    ]).then(data => {
        const deptId = res.filter((dept)=> dept.department_name === data.department)[0].id;
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);',[data.title, data.salary, deptId], (err, ans) => {
            if(err) {
                throw err;
            };
            console.log('\nRole added');
            start();
        })
    })
    })
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
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "depname"
        }
    ]).then( dep=> {
        const sql = "INSERT INTO department (department_name) VALUES (?);";

        db.query(sql, dep.depname, (err,data) => {
            if(err) {
                throw err;
            }
            console.table(data);
            console.log(`\nNew department has been added.`);
            start();
        })
    })
}
start();