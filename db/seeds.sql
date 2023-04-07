USE employee_tracker_db;

INSERT INTO department (name) VALUES
  ('HR'),
  ('Engineering'),
  ('Sales'),
  ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 75000, 1),
  ('HR Coordinator', 45000, 1),
  ('Software Engineer', 85000, 2),
  ('Senior Software Engineer', 110000, 2),
  ('Sales Manager', 60000, 3),
  ('Sales Associate', 35000, 3),
  ('Marketing Manager', 70000, 4),
  ('Marketing Coordinator', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Alice', 'Johnson', 3, NULL),
  ('Bob', 'Brown', 4, 3),
  ('Charlie', 'Davis', 5, NULL),
  ('Eve', 'Martinez', 6, 5),
  ('Frank', 'Garcia', 7, NULL),
  ('Grace', 'Lee', 8, 7);
