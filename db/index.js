const connection = require('./connection');

class Db{
    constructor(connection){
        this.connection = connection;
    }

    findAllDepartment(){
        const sqlQuery = 'SELECT * FROM department;'
        return this.connection.promise().query(sqlQuery);
    }

    findAllRoles(){
        const sqlQuery = 'SELECT * FROM role;';
        return this.connection.promise().query(sqlQuery);
    }

    findAllEmployees(){
        const sqlQuery = 'SELECT * FROM employee;';
        return this.connection.promise().query(sqlQuery);
    }

    addDepartment(departmentName){
        const query = `
        INSERT INTO department(name)
        VALUES (?);`
        return this.connection.promise().query(query,departmentName);
    }

    //add role to database
    addRole(role){
        const sqlQuery = `INSERT INTO role(title, salary, department_id)
        VALUES(?,?,(SELECT id FROM department WHERE name = ?));`;
        const params = [role.title,role.salary,role.department];
        console.log(params);
        return this.connection.promise().query(sqlQuery,params);
    }

    addEmployee(first_name,last_name,role,manager){        
        
        if(manager==='None'){
            const query = `
            INSERT INTO employee(first_name, last_name, role_id)
            VALUES(?,?,(SELECT id FROM role WHERE title = ?));`;
            const params = [first_name,last_name,role];
            return this.connection.promise().query(query,params);
        }

        //To do: fix error when employee is not null
        const query = `
        INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES(?,?,(SELECT id FROM role WHERE title = ?),?);`;

        const mg_firstname = manager.split(" ")[0];
        const mg_lastname = manager.split(" ")[1];
        const mQuery = `SELECT * FROM employee WHERE first_name = ? AND last_name = ?;`;
        const mParams = [mg_firstname, mg_lastname];

        this.connection.promise().query(mQuery,mParams).then(([row]) => {
            console.log(row);
            const manager_id = row[0].id;
            const params = [first_name,last_name,role,manager_id];
            return this.connection.promise().query(query,params);
        });        
    }
}

module.exports = new Db(connection);