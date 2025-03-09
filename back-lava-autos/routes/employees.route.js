import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";
import { validateEmployee, validateEmployeeId } from "../validators/employees.validator.js";

const employeesRouter = Router();

employeesRouter.post('/create', validateEmployee, employeeController.createEmployee);

employeesRouter.put('/update/:cedula', validateEmployeeId, validateEmployee, employeeController.updateEmployee);

employeesRouter.get('/get/:cedula', validateEmployeeId ,employeeController.getEmployeeById);

employeesRouter.delete('/delete/:cedula', validateEmployeeId ,employeeController.deleteEmployee);

employeesRouter.get('/', employeeController.getEmployees);

export default employeesRouter;