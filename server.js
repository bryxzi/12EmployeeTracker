const Database = require('./db/query');
const {
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
} = require('./helpers/input');
const { formatDepartmentsTable, formatRolesTable, formatEmployeesTable, formatBudgetTable } = require('./helpers/table');

async function main() {
    const db = new Database();
    await db.connect();

    let exit = false;

    while (!exit) {
        const action = await promptUser();

        switch (action) {
            case 'View all departments':
                const departmentsView = await db.getAllDepartments();
                console.log(formatDepartmentsTable(departmentsView));
                break;
            case 'View all roles':
                const rolesView = await db.getAllRoles();
                console.log(formatRolesTable(rolesView));
                break;
            case 'View all employees':
                const employeesView = await db.getAllEmployees();
                console.log(formatEmployeesTable(employeesView));
                break;
            case 'Add a department':
                const newDepartmentName = await promptAddDepartment();
                await db.addDepartment(newDepartmentName);
                console.log(`Added department: ${newDepartmentName}`);
                break;
            case 'Add a role':
                const departments = await db.getAllDepartments();
                const newRole = await promptAddRole(departments);
                await db.addRole(newRole.title, newRole.salary, newRole.departmentId);
                console.log(`Added role: ${newRole.title}`);
                break;
            case 'Add an employee':
                const roles = await db.getAllRoles();
                const managers = await db.getManagers();
                const newEmployee = await promptAddEmployee(roles, managers);
                await db.addEmployee(newEmployee.firstName, newEmployee.lastName, newEmployee.roleId, newEmployee.managerId);
                console.log(`Added employee: ${newEmployee.firstName} ${newEmployee.lastName}`);
                break;
            case 'Update an employee role':
                const allEmployees = await db.getAllEmployees();
                const allRoles = await db.getAllRoles();
                const { employeeId: employeeIdRole, roleId: roleIdRole } = await promptUpdateEmployeeRole(allEmployees, allRoles);
                await db.updateEmployeeRole(employeeIdRole, roleIdRole);
                console.log(`Updated employee role`);
                break;
            case 'Update employee manager':
                const employeesForManagerUpdate = await db.getAllEmployees();
                const managersForManagerUpdate = await db.getManagers();
                const { employeeId: employeeIdManager, managerId: managerIdManager } = await promptUpdateEmployeeManager(employeesForManagerUpdate, managersForManagerUpdate);
                await db.updateEmployeeManager(employeeIdManager, managerIdManager);
                console.log(`Updated employee manager`);
                break;
            case 'View employees by manager':
                const managersBy = await db.getManagers();
                const managerId = await promptSelectEmployeeByManager(managersBy);
                const employeesByManager = await db.getEmployeesByManager(managerId);
                console.log(formatEmployeesTable(employeesByManager));
                break;
            case 'View employees by department':
                const departmentsBy = await db.getAllDepartments();
                const departmentId = await promptSelectEmployeeByDepartment(departmentsBy);
                const employeesByDepartment = await db.getEmployeesByDepartment(departmentId);
                console.log(formatEmployeesTable(employeesByDepartment));
                break;
            case 'Delete department':
                const departmentsToDelete = await db.getAllDepartments();
                const departmentIdToDelete = await promptSelectDepartment(departmentsToDelete);
                await db.deleteDepartment(departmentIdToDelete);
                console.log('Department deleted');
                break;
            case 'Delete role':
                const rolesToDelete = await db.getAllRoles();
                const roleIdToDelete = await promptSelectRole(rolesToDelete);
                await db.deleteRole(roleIdToDelete);
                console.log('Role deleted');
                break;
            case 'Delete employee':
                const employeesToDelete = await db.getAllEmployees();
                const employeeIdToDelete = await promptSelectEmployee(employeesToDelete);
                await db.deleteEmployee(employeeIdToDelete);
                console.log('Employee deleted');
                break;
            case 'View total utilized budget of a department':
                const departmentsForBudget = await db.getAllDepartments();
                const departmentIdForBudget = await promptSelectDepartment(departmentsForBudget);
                const budgetData = await db.getTotalUtilizedBudgetByDepartment(departmentIdForBudget);
                console.log(formatBudgetTable(budgetData));
                break;
            case 'Exit':
                exit = true;
                break;
            default:
                console.log('Invalid option');
        }
    }

    await db.close();
    console.log('Goodbye!');
}

main().catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
});

