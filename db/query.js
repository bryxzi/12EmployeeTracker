const mysql = require('mysql2/promise');
const config = require('../connection/config');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection(config);
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
    }
  }

  async getAllDepartments() {
    const [rows] = await this.connection.query('SELECT * FROM department');
    return rows;
  }

  async getAllRoles() {
    const [rows] = await this.connection.query(`SELECT role.id, role.title, role.salary, department.name as department
                                                FROM role
                                                LEFT JOIN department ON role.department_id = department.id`);
    return rows;
  }

  async getAllEmployees() {
    const [rows] = await this.connection.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager
                                                FROM employee e
                                                LEFT JOIN role ON e.role_id = role.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                LEFT JOIN employee m ON e.manager_id = m.id`);
    return rows;
  }

  async getManagers() {
    const [rows] = await this.connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)`);
    return rows;
  }

  async addDepartment(name) {
    await this.connection.query('INSERT INTO department (name) VALUES (?)', [name]);
  }

  async addRole(title, salary, departmentId) {
    await this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    await this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }

  async updateEmployeeRole(employeeId, roleId) {
    await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }

  async updateEmployeeManager(employeeId, managerId) {
    await this.connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
  }

  async getEmployeesByManager(managerId) {
    const [rows] = await this.connection.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager
                                                FROM employee e
                                                LEFT JOIN role ON e.role_id = role.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                LEFT JOIN employee m ON e.manager_id = m.id
                                                WHERE e.manager_id = ?`, [managerId]);
    return rows;
  }

  async getEmployeesByDepartment(departmentId) {
    const [rows] = await this.connection.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager
                                                FROM employee e
                                                LEFT JOIN role ON e.role_id = role.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                LEFT JOIN employee m ON e.manager_id = m.id
                                                WHERE department.id = ?`, [departmentId]);
    return rows;
  }

  async deleteDepartment(departmentId) {
    await this.connection.query('DELETE FROM department WHERE id = ?', [departmentId]);
  }

  async deleteRole(roleId) {
    await this.connection.query('DELETE FROM role WHERE id = ?', [roleId]);
  }

  async deleteEmployee(employeeId) {
    await this.connection.query('DELETE FROM employee WHERE id = ?', [employeeId]);
  }

  async getTotalUtilizedBudgetByDepartment(departmentId) {
    const [rows] = await this.connection.query(`SELECT department.id, department.name, SUM(role.salary) as total_budget
                                                FROM employee
                                                LEFT JOIN role ON employee.role_id = role.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                WHERE department.id = ?
                                                GROUP BY department.id, department.name`, [departmentId]);
    return rows;
  }
}
module.exports = Database;
