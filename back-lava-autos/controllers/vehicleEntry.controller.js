import VehicleEntry from '../models/vehicleEntry.model.js';
import Vehicle from '../models/vehicle.model.js';

const getVehicleEntries = async (req, res) => {
    try {
        const vehicleEntries = await VehicleEntry.findAll();
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
        const vehicleData = req.body.vehicle;
        const serviceData = req.body.service;

        //find or create vehicle
        const [vehicle, created] = await Vehicle.findOrCreate({
            where: {
                placa: vehicleData.placa
            },
            defaults: vehicleData,
            transaction
        });

        // If vehicle exist, update its information
        if (!created) {
            await vehicle.update(vehicleData, { transaction });
        }

        // Create vehicle entry
        const vehicleEntry = await VehicleEntry.create({
            ...serviceData,
            placa: vehicle.placa,
        }, {
            transaction
        });

        // Create service
        // ...

        await transaction.commit();
        return res.status(201).json({
            message: 'Entrada de vehículo creada con éxito',
            vehicleEntry,
            vehicle
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