import { validationResult } from 'express-validator';
import Employee from '../models/employee.model.js';

const createEmployee = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const employee = await Employee.create(req.body);
        return res.status(201).json(employee);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al crear empleado',
            details: error.message
        });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            where: { status: 'active' },
        });
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener empleados',
            details: error.message
        });
    }
}

const getEmployeeById = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const employee = await Employee.findByPk(req.params.cedula);
        if (employee) {
            return res.status(200).json(employee);
        }
        return res.status(404).json({ error: 'Employee not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener empleado',
            details: error.message
        });
    }
}

const updateEmployee = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const employee = await Employee.findByPk(req.params.cedula);
        if (employee) {
            const allowedFields = ['nombre', 'apellido', 'contacto', 'direccion', 'fecha_nacimiento', 'porcentaje_servicio'];
            const filteredData = Object.keys(req.body)
                .filter(key => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
            await employee.update(filteredData);
            return res.status(200).json(employee);
        }
        return res.status(404).json({ error: 'Employee not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al actualizar empleado',
            details: error.message
        });
    }
}

const deleteEmployee = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const employee = await Employee.findByPk(req.params.cedula);
        if (employee) {
            await employee.destroy();
            return res.status(204).json();
        }
        return res.status(404).json({ error: 'Employee not found' });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar empleado',
            details: error.message
        });
    }
}

export const employeeController = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};