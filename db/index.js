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
        VALUES(?,?,?,?);`;

        const param = [first_name,last_name,role,manager]
        console.log(role, manager, param);
        return this.connection.promise().query(query,param);        
    }

    updateEmployeeRole(name,role){
        const firstname = name.split(" ")[0];
        const lastname = name.split(" ")[1];
        const query = `
            UPDATE employee
            SET role_id = ( SELECT id FROM role WHERE title = ? )
            WHERE first_name = ? AND last_name = ?`;
        const params = [role,firstname,lastname];
        return this.connection.promise().query(query,params);
    }

    findEmployeesByManager(){
        const sql = `
        SELECT
            CONCAT(m.first_name, ' ',m.last_name ) AS Manager,
            CONCAT(e.first_name, ' ', e.last_name) AS 'Employees'
        FROM employee e
        INNER JOIN employee m ON
            m.id = e.manager_id
        ORDER BY Manager; `
        return this.connection.promise().query(sql);
    }

    findEmployeesByDepartment(){
        const sql = `
            SELECT
                CONCAT(e.first_name, ' ',e.last_name ) As 'Name',
                d.name AS 'Department'
            FROM employee e
            LEFT JOIN role r ON
                r.id = e.role_id
            LEFT JOIN department d on
                d.id = r.department_id
            ORDER BY Department;`;
        return this.connection.promise().query(sql);
    }

    deleteDepartment(name){
        const sql = `
            DELETE FROM department
            WHERE name = ?`;
        return this.connection.promise().query(sql,name);
    }

    deleteRole(title){
        const sql = `
            DELETE FROM role
            WHERE title = ?`;
        return this.connection.promise().query(sql,title);
    }

    deleteEmployee(name){
        const first_name = name.split(" ")[0];
        const last_name = name.split(" ")[1];
        const sql = `
            DELETE FROM employee
            WHERE first_name = ? AND last_name = ?`;
        const params = [first_name,last_name];
        return this.connection.promise().query(sql,params);
    }

    findUtilizedBudget(){
        const sql = `
        SELECT
            SUM(r.salary) As 'utilized budget',
            d.name AS 'Department'
        FROM employee e
        LEFT JOIN role r ON
            r.id = e.role_id
        LEFT JOIN department d on
            d.id = r.department_id
        group by Department
        ORDER BY Department;`;
        return this.connection.promise().query(sql);    
    }
}

module.exports = new Db(connection);