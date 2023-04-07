const inquirer = require('inquirer');
const { validateNotEmpty } = require('./validator');

async function promptUser() {
  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update employee manager',
        'View employees by manager',
        'View employees by department',
        'Delete department',
        'Delete role',
        'Delete employee',
        'View total utilized budget of a department',
        'Exit',
      ],
    },
  ]);

  return response.action;
}

async function promptAddDepartment() {
  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
      validate: validateNotEmpty,
    },
  ]);

  return response.name;

}

async function promptAddRole(departments) {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: validateNotEmpty,
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: validateNotEmpty,
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the new role:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    return response;
  }
  
  async function promptAddEmployee(roles, managers) {
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  
    const managerChoices = managers.map((manager) => ({
      name: manager.name,
      value: manager.id,
    }));
  
    managerChoices.unshift({ name: 'None', value: null });
  
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:',
        validate: validateNotEmpty,
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the new employee:',
        validate: validateNotEmpty,
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for the new employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for the new employee:',
        choices: managerChoices,
      },
    ]);
  
    return {
      firstName: response.firstName,
      lastName: response.lastName,
      roleId: response.roleId,
      managerId: response.managerId,
    };
  }
  
  async function promptUpdateEmployeeRole(employees, roles) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update their role:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    return response;
  }

  async function promptUpdateEmployeeManager(employees, managers) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update their manager:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the new manager for the employee:',
        choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      },
    ]);
  
    return response;
  }
  
  async function promptSelectEmployeeByManager(managers) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select a manager to view their employees:',
        choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      },
    ]);
  
    return response.managerId;
  }
  
  async function promptSelectEmployeeByDepartment(departments) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department to view its employees:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    return response.departmentId;
  }
  
  async function promptSelectDepartment(departments) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    return response.departmentId;
  }
  
  async function promptSelectRole(roles) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Select a role:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    return response.roleId;
  }
  
  async function promptSelectEmployee(employees) {
    const response = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);
  
    return response.employeeId;
  }

  module.exports = {
    promptUser,
    promptAddDepartment,
    promptAddRole,
    promptAddEmployee,
    promptUpdateEmployeeRole,
    promptUpdateEmployeeManager,
    promptSelectEmployeeByManager,
    promptSelectEmployeeByDepartment,
    promptSelectDepartment,
    promptSelectRole,
    promptSelectEmployee,
  };