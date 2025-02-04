import Employee from '../models/employee.model';

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        return res.status(201).json(employee);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}