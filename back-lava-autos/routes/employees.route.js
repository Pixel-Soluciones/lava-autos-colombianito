import { Router } from "express";

const employeesRouter = Router();

employeesRouter.post('/', (req, res) => {
    // Logic to create a new employee
    res.send('Employee created');
});

employeesRouter.put('/:id', (req, res) => {
    // Logic to modify an existing employee
    res.send(`Employee with id ${req.params.id} modified`);
});

employeesRouter.get('/:id', (req, res) => {
    // Logic to get an employee by id
    res.send(`Employee with id ${req.params.id} fetched`);
});

employeesRouter.delete('/:id', (req, res) => {
    // Logic to delete an employee by id
    res.send(`Employee with id ${req.params.id} deleted`);
});

export default employeesRouter;