const inquirer = require('inquirer');
const action = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'category',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
    .then(answer => {
        switch(answer.category){
            case 'view all departments' :
                console.log('view all departments'); //to do - db query 
                break;
            case 'view all roles' :
                console.log('view all roles');  //to do - db query 
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
                console.log('add an employee'); //to do - add another inquirer
                break;
            case 'update an employee role' :
                console.log('update an employee role'); //to do - add another inquirer
                break;
        }
    });
}

action();

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
        console.log(`Added ${department.name} department to database.`); //to do add department to database
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
            choices: ['Technology','Finance'] //to do get this list from database query
        }
    ])
    .then(role => {
        console.log(role); //to do add role to database
    })
}