const inquirer = require('inquirer');
const cTable = require('console.table');
const Db = require('./db/index');
const db = require('./db/index');


const action = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'category',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 
                    'add a department', 'add a role', 'add an employee', 
                    'update an employee role','update employee manager',
                    'view employees by manager','view employees by department',
                    'delete department','delete role','delete employee',
                    'view utilized budget']
        }
    ])
    .then(answer => {
        switch(answer.category){
            case 'view all departments' :
                viewAllDepartment(); 
                break;
            case 'view all roles' :
                viewAllRoles(); 
                break; 
            case 'view all employees' :
                viewAllemployess();
                break;
            case 'add a department' :
                addDepartment();
                break;
            case 'add a role' :
                addRole();
                break;
            case 'add an employee' :
                addEmployee();
                break;
            case 'update an employee role' :
                updateEmployee();
                break;
            case 'update employee manager' :
                console.log('update employee manager'); //To do: create function
                break;
            case 'view employees by manager' :
                console.log('view employees by manager'); //To do: create function
                break;
            case 'view employees by department' :
                console.log('view employees by department'); //To do: create function
                break;
            case 'delete department' :
                console.log('delete department'); //To do: create function
                break;
            case 'delete role' :
                console.log('delete role'); //To do: create function
                break;
            case 'delete employee' :
                console.log('delete employee'); //To do: create function
                break;
            case 'view utilized budget' :
                console.log('view utilized budget'); //To do: create function
                break;
        }
    });
}

const viewAllDepartment = () => {
    Db.findAllDepartment().then(([rows]) => {
        console.table(rows);
        action(); 
    });
}

const viewAllRoles = () => {
    Db.findAllRoles().then(([rows])=>{
        console.table(rows);
        action();
    });
}

function viewAllemployess (){
    //const db = new Db;
    Db.findAllEmployees().then(([rows]) => {
        console.table(rows);
        action();
    });
}

const addDepartment = () =>{
    inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is the name of your department?',
            validate: name => name ? true : false
        }
    ])
    .then(department => {
        Db.addDepartment(department.name).then(([rows])=>{
            console.log(`Added ${department.name} department to the database`);
            action();
        });
    });
}

const addRole = () => {
    Db.findAllDepartment().then(([rows]) => {
        const departmentNames = rows.map((row) => row.name);
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your role?',
                validate: title => title ? true : false
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: salary => salary ? true : false
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department this role belongs to?',
                choices: departmentNames
            }
        ])
        .then(role => {
            //const params = [role.title,role.salary,role.department];
            Db.addRole(role).then((result)=> {
                console.log(`Added ${role.title} role to database`);        
                action();
            });
        });
    });    
}

const addEmployee = () => {
    const { first_name,last_name,role,manager} = "";    
    Db.findAllRoles().then(([rows]) => {
        const roles = rows.map((row) => row.title);
        db.findAllEmployees().then(([rows]) =>{
            const manager = rows.map(row => row.first_name + " " + row.last_name);
            manager.push("None");
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name? (Required)",
                    validate: first_name => first_name ? true : false
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name? (Required)",
                    validate: last_name => last_name ? true : false
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role",
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager",
                    choices: manager
                }
            ])
            .then(employee => {
                Db.addEmployee(employee.first_name,employee.last_name,employee.role,employee.manager).then(result => {
                    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
                    action();
                });
            });
        });
    });
}

// const updateEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'name',
//             message: 'Which employees role do you want to update? (Required)',
//             choices: ['rafe'] //To do get all employees name from database
//         },
//         {
//             type: 'list',
//             name: 'role',
//             message: 'Which role do you want to assign the selected employee?',
//             choices: ['Manager'] //To do get list of role names
//         }
//     ]);
// }


// const getAlldepartments = () => {
//     const sql = `SELECT * FROM department;`;
//     return new Promise((resolve,reject) => {
//         db.query(sql,(err,rows)=>{
//             if(err){
//                 reject(err)
//                 return;
//             }
//             resolve(rows);
//         });
//     });
// }

// const getDepartmentsNames = () => {
//     getAlldepartments().then(rows => {
//         // console.log(rows);
//         const name = [];
//         rows.forEach(element => {
//             name.push(element.name);
//         });
//         console.log(name);
//         return name;       
//     });
// }

action();
//console.log(getDepartmentsNames());