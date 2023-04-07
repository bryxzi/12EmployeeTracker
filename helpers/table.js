const Table = require('cli-table3');

function formatDepartmentsTable(departments) {
  const table = new Table({
    head: ['ID', 'Department'],
    colWidths: [10, 30],
  });

  departments.forEach((department) => {
    table.push([department.id, department.name]);
  });

  return table.toString();
}

function formatRolesTable(roles) {
  const table = new Table({
    head: ['ID', 'Title', 'Salary', 'Department'],
    colWidths: [10, 30, 10, 30],
  });

  roles.forEach((role) => {
    table.push([role.id, role.title, role.salary, role.department_name]);
  });

  return table.toString();
}

function formatEmployeesTable(employees) {
  const table = new Table({
    head: ['ID', 'First Name', 'Last Name', 'Role', 'Salary', 'Department', 'Manager'],
    colWidths: [10, 15, 15, 30, 10, 30, 20],
  });

  employees.forEach((employee) => {
    table.push([
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.role_title,
      employee.role_salary,
      employee.department_name,
      employee.manager_name || 'None',
    ]);
  });

  return table.toString();
}

function formatBudgetTable(budgetData) {
  const table = new Table({
    head: ['Department', 'Total Utilized Budget'],
    colWidths: [30, 20],
  });

  budgetData.forEach((data) => {
    table.push([data.department_name, data.total_utilized_budget]);
  });

  return table.toString();
}

module.exports = {
  formatDepartmentsTable,
  formatRolesTable,
  formatEmployeesTable,
  formatBudgetTable,
};
