import { Op } from 'sequelize';
import AsignedServices from '../models/asignedServices.model.js';
import Employee from '../models/employee.model.js';
import Service from '../models/service.model.js';

const getDailyReport = async (req, res) => {
    try {
        const { fecha } = req.body;
        
        const asignedServices = await AsignedServices.findAll({
            attributes: ['id', 'placa', 'valor'],
            where: {
                createdAt: {
                    [Op.between]: [new Date(fecha), new Date(fecha + ' 23:59:59')]
                }
            },
            include: [
                {
                    model: Employee,
                    required: false,
                    attributes: ['nombre', 'porcentaje_servicio']
                },
                {
                    model: Service,
                    required: false,
                    attributes: ['nombre_servicio']
                },
            ]
        });

        const formattedResponse = asignedServices.map(service => ({
            id: service.id,
            placa: service.placa,
            servicio: service.Service ? service.Service.nombre_servicio : null,
            trabajador: service.Employee ? service.Employee.nombre.trim() : null,
            valor: service.valor,
            valor_porcentaje: service.Employee? service.valor * (service.Employee.porcentaje_servicio / 100) : null
        }));

        return res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener servicios asignados',
            details: error.message
        });
    }
}

const getMonthlyReport = async (req, res) => {
    try {
        const { month, year } = req.body;

        const asignedServices = await AsignedServices.findAll({
            attributes: ['id', 'createdAt', 'placa', 'valor'],
            where: {
                createdAt: {
                    [Op.between]: [new Date(`${year}-${month}-01`), new Date(`${year}-${month}-31`)]
                }
            },
            include: [
                {
                    model: Employee,
                    required: false,
                    attributes: ['nombre', 'porcentaje_servicio']
                },
                {
                    model: Service,
                    required: false,
                    attributes: ['nombre_servicio']
                },
            ]
        });

        const formattedResponse = asignedServices.map(service => ({
            id: service.id,
            fecha: service.createdAt.toISOString().split('T')[0],
            placa: service.placa,
            servicio: service.Service? service.Service.nombre_servicio : null,
            trabajador: service.Employee? service.Employee.nombre.trim() : null,
            valor: service.valor,
            valor_porcentaje: service.Employee? service.valor * (service.Employee.porcentaje_servicio / 100) : null
        }));

        return res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener servicios asignados',
            details: error.message
        });
    }
}

export const reportsController = {
    getDailyReport,
    getMonthlyReport
}