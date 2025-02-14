import { body, param, validationResult } from 'express-validator';

const validateEmployee = [
    body('cedula').notEmpty().withMessage('Cédula es requerida'),
    body('nombre').notEmpty().withMessage('Nombre es requerido'),
    body('apellido').notEmpty().withMessage('Apellido es requerido'),
    body('contacto').notEmpty().withMessage('Contacto es requerido'),
    body('direccion').notEmpty().withMessage('Dirección es requerida'),
    body('fecha_nacimiento').isISO8601().withMessage('Fecha de nacimiento no válida'),
    body('porcentaje_servicio').isFloat({ min: 0, max: 100 }).withMessage('Porcentaje no válido'),
];

const validateEmployeeId = [
    param('cedula').notEmpty().withMessage('ID es requerido'),
];

export { validateEmployee, validateEmployeeId };