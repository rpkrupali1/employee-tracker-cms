const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

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
                console.log('view all employees');  //to do - db query 
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
        //add department to database
        const query = `
        INSERT INTO department(name)
        VALUES (?);`
        db.query(query,department.name,(err,result) => {
            if(err){
                console.log({error: err.message});
                return;
            }
            console.log(`Added ${department.name} department to the database`);
            action();
        })
    });
}

const addRole = () => {
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
            choices: ['Technology','dpt2']//getDepartmentsNames() //to do get this list from database query
        }
    ])
    .then(role => {
        console.log(role); 
        //add role to database
        const sql = `INSERT INTO role(title, salary, department_id)
        VALUES(?,?,(SELECT id FROM department WHERE name = ?));`;
        const params = [role.title,role.salary,role.department];
        db.query(sql,params,(err,result)=> {
            if(err)
                console.log(`There is an error ${err.message} when adding role to database`);
            else
                console.log(`Added ${role.title} role to database`);        
            action();
        });
    });
}

const addEmployee = () => {
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
            choices: ['Engineer','Accountant'] //To do provide this list from sql
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager",
            choices: ['John','Mike'] //To do provide this list from sql
        }
    ])
    .then(employee => {
        console.log(employee);
        //To Do add this employee to database
    })
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Which employees role do you want to update? (Required)',
            choices: ['rafe'] //To do get all employees name from database
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: ['Manager'] //To do get list of role names
        }
    ]);
}

const viewAllDepartment = () => {
    const sql = `SELECT * FROM department;`
    const departments = db.query(sql,(err,rows) => {
        if(err){
            console.log(err.message);
            return;
        }
        //convert json to table format
        console.table(rows);
        action(); 
    });
}

const viewAllRoles = () => {
    const sql = `SELECT * FROM role;`;
    db.query(sql,(err,rows)=>{
        if(err){
            console.log(err.message);
            return;
        }
        //json to table format
        console.table(rows);
        action();
    });
}

const getAlldepartments = () => {
    const sql = `SELECT * FROM department;`;
    return new Promise((resolve,reject) => {
        db.query(sql,(err,rows)=>{
            if(err){
                reject(err)
                return;
            }
            resolve(rows);
        });
    });
}

const getDepartmentsNames = () => {
    getAlldepartments().then(rows => {
        // console.log(rows);
        const name = [];
        rows.forEach(element => {
            name.push(element.name);
        });
        console.log(name);
        return name;       
    });
}

action();
//console.log(getDepartmentsNames());