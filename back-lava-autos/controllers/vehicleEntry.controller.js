import VehicleEntry from '../models/vehicleEntry.model.js';
import Vehicle from '../models/vehicle.model.js';
import AsignedServices from '../models/asignedServices.model.js';
import { Op, Sequelize } from 'sequelize';

const getVehicleEntries = async (req, res) => {
    try {
        const vehicleEntries = await VehicleEntry.findAll({
            include: [
                {
                    model: Vehicle
                },
                {
                    model: AsignedServices,
                    where: {
                        placa: {
                            [Op.eq]: Sequelize.col('VehicleEntry.placa')
                        },
                        createdAt: {
                            [Op.eq]: Sequelize.col('VehicleEntry.createdAt')
                        }
                    }
                }
            ]
        });
        return res.status(200).json(vehicleEntries);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al obtener entradas de vehículos',
            details: error.message
        });
    }
}

const createVehicleEntry = async (req, res) => {
    const transaction = await req.app.locals.db.transaction();

    try {
        // const vehicleData = req.body.vehicle;
        // const serviceData = req.body.service;
        const { vehicle: vehicleData, services } = req.body;      

        // Find or create vehicle
        const [vehicle, created] = await Vehicle.findOrCreate({
            where: {
                placa: vehicleData.placa
            },
            defaults: vehicleData,
            transaction
        });

        // If vehicle exists, update its information
        if (!created) {
            await vehicle.update(vehicleData, { transaction });
        }

        // Create vehicle entry
        const vehicleEntry = await VehicleEntry.create({
            placa: vehicleData.placa,
        }, {
            transaction
        });

        // Create services entries
        const vehicleServices = await Promise.all(services.map(async (service) => {
            const asignedService = await AsignedServices.create({
                placa: vehicleData.placa,
                id_servicio: service.id_servicio,
                valor: service.valor_servicio,
            }, { transaction });

            return asignedService;
        }));

        await transaction.commit();
        return res.status(201).json({
            message: 'Entrada de vehículo creada con éxito',
            vehicleEntry,
            vehicleData,
            vehicleServices
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            error: 'Error al crear entrada de vehículo',
            details: error.message
        });
    }
}

export const vehicleEntryController = {
    getVehicleEntries,
    createVehicleEntry
}