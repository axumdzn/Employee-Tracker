INSERT INTO department (department_name)
VALUES  ("Finance"),
        ("Engineering"),
        ("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES  ("Manager", 90000, 1),
        ("Accountant", 120000, 1),
        ("Intern", 35000, 1),
        ("Manager",250000, 2),
        ("Senior Engineer", 230000, 2),
        ("Intern", 50000, 2),
        ("Manager", 120000, 3),
        ("Salesperson", 80000, 3),
        ("Intern", 20000, 3);

INSERT INTO employee (first_name,last_name,role_id)
VALUES  ("Jared", "Hector", 1),
        ("Don", "Cath", 4),
        ("David", "Sieggman", 7),
