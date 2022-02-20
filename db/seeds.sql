use database employees;

-- INSERT INTO department (name)
-- VALUES
-- ('Technology'),
-- ('Finance'),
-- ('Marketing'),
-- ('IT');

-- INSERT INTO role (title, salary, department_id)
-- VALUES
-- ('Quality Architect',125000,1),
-- ('Software Engineer',110000,1),
-- ('Sr Sofware Engineer', 140000,1),
-- ('Business Analyst',90000,1),
-- ('System Engineer',100000,1),
-- ('Team Leader',140000,1),
-- ('Financial planner',69064,2),
-- ('Account manager',60143,2),
-- ('Investment Analyst',73514,2),
-- ('Economist',97850,2),
-- ('Financial reporting manager',12000,2),
-- ('Analyst',80000,3),
-- ('Sr Analyst',95000,3),
-- ('Manager',115000,3),
-- ('Assistant',55000,3),
-- ('Digital Strategist',63494,3),
-- ('Network Engineer',102000,4),
-- ('Systems Administrator',90000,4),
-- ('Technical support specialist',55345,4),
-- ('Leader',95678,4);


-- INSERT INTO employee (first_name,last_name,role_id,manager_id)
-- VALUES
-- ('Michale','Robbin',1,6),
-- ('Carlos','Snares',2,6),
-- ('Enric','Dosio',3,6),
-- ('Jhon','Snares',4,6),
-- ('Joseph','Dosni',5,6),
-- ('Zanifer','Emily',6,NULL),
-- (' Kuleswar','Sitaraman',7,8),
-- ('Henrey','Gabriel',8,NULL),
-- ('Alex','Manuel',9,11),
-- ('George','Mardy',10,11),
-- ('Mario','Saule',11,NULL),
-- ('Alan','Snappy',12,14),
-- ('Maria','Foster',13,14),
-- ('Ronald', 'Firbank', 14, NULL),
-- ('Virginia', 'Woolf', 15,20),
-- ('Piers', 'Gaveston', 16,20),
-- ('Charles', 'LeRoi', 17,20),
-- ('Katherine', 'Mansfield', 18,20),
-- ('Dora', 'Carrington', 19, 20 ),
-- ('Edward', 'Bellamy', 20, NULL),
-- ('Montague', 'Summers', 3,6),
-- ('Octavia', 'Butler', 3,6),
-- ('Unica', 'Zurn', 2,6),
-- ('James', 'Fraser',2,6),
-- ('Jack', 'London', 2,6),
-- ('Robert', 'Bruce', 4,6),
-- ('Peter', 'Greenaway', 4,6),
-- ('Derek', 'Jarman', 5,6),
-- ('Paolo', 'Pasolini', 5,6),
-- ('Heathcote', 'Williams', 7,8),
-- ('Sandy', 'Powell', 9,11),
-- ('Emil', 'Zola', 9,11),
-- ('Sissy', 'Coalpits', 10,11),
-- ('Antoinette', 'Capet', 12,14),
-- ('Samuel', 'Delany', 13,14),
-- ('Tony', 'Duvert', 15,20),
-- ('Dennis', 'Cooper', 16,20),
-- ('Monica', 'Bellucci',17,20),
-- ('Samuel', 'Johnson', 18,20),
-- ('John', 'Dryden', 19,20),
-- ('Alexander', 'Pope', 12,14);

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
    
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);