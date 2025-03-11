import VehicleEntry from '../models/vehicleEntry.model.js';
import Vehicle from '../models/vehicle.model.js';
import AsignedServices from '../models/asignedServices.model.js';
import { Op, Sequelize } from 'sequelize';


const getVehicleEntries = async (req, res) => {
    try {
        const vehicleEntries = await VehicleEntry.findAll({
            include: [
                {
                    model: Vehicle,
                    required: false 
                },
                {
                    model: AsignedServices,
                    required: false, 
                    where: {
                        placa: {
                            [Op.eq]: Sequelize.col("VehicleEntry.placa")
                        },
                        [Op.and]: [
                            Sequelize.where(
                                Sequelize.fn("DATE", Sequelize.col("AsignedServices.createdAt")),
                                "=",
                                Sequelize.fn("DATE", Sequelize.col("VehicleEntry.createdAt"))
                            )
                        ]
                    }
                }
            ],
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("DATE", Sequelize.col("VehicleEntry.createdAt")),
                        "=",
                        Sequelize.fn("CURDATE")
                    )
                ]
            }
        });

        return res.status(200).json(vehicleEntries);
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener entradas de vehículos",
            details: error.message
        });
    }
};

const createVehicleEntry = async (req, res) => {
    const transaction = await req.app.locals.db.transaction();

    try {
        const { vehicle: vehicleData, services } = req.body;      

        const [vehicle, created] = await Vehicle.findOrCreate({
            where: {
                placa: vehicleData.placa
            },
            defaults: vehicleData,
            transaction
        });

        if (!created) {
            await vehicle.update(vehicleData, { transaction });
        }

        const vehicleEntry = await VehicleEntry.create({
            placa: vehicleData.placa,
        }, {
            transaction
        });

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

// se agrega o eliminan servicios a la entrada de vehículo
const updateVehicleEntry = async (req, res) => {
    const transaction = await req.app.locals.db.transaction();

    try {
        const { vehicle: vehicleData, services } = req.body;
        const { id } = req.params;
        const vehicleEntry = await VehicleEntry.findByPk(id, { transaction });
        if (!vehicleEntry) {
            return res.status(404).json({
                error: 'Entrada de vehículo no encontrada'
            });
        }

        await vehicleEntry.update(vehicleData, { transaction });

        const existingServices = await AsignedServices.findAll({
            where: {
                placa: vehicleData.placa,
                createdAt: {
                    [Op.gte]: vehicleEntry.createdAt
                }
            },
            transaction
        });

        const servicesToDelete = existingServices.filter(service => !services.some(s => s.id_servicio === service.id_servicio));
        await AsignedServices.destroy({
            where: {
                id: servicesToDelete.map(service => service.id)
            },
            transaction
        });

        const servicesToCreate = services.filter(service => !existingServices.some(s => s.id_servicio === service.id_servicio));
        const vehicleServices = await Promise.all(servicesToCreate.map(async (service) => {
            const asignedService = await AsignedServices.create({
                placa: vehicleData.placa,
                id_servicio: service.id_servicio,
                valor: service.valor_servicio,
            }, { transaction });
            return asignedService;
        }));

        await transaction.commit();
        return res.status(200).json({
            message: 'Entrada de vehículo actualizada con éxito',
            vehicleEntry,
            vehicleData,
            vehicleServices
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            error: 'Error al actualizar entrada de vehículo',
            details: error.message
        });
    }
}

export const vehicleEntryController = {
    getVehicleEntries,
    createVehicleEntry,
    updateVehicleEntry
}