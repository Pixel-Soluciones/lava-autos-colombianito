import VehicleEntry from './vehicleEntry.model.js';
import AsignedServices from './asignedServices.model.js';
import Employee from './employee.model.js';

VehicleEntry.hasMany(AsignedServices, {
    foreignKey: 'placa',
    sourceKey: 'placa'
});

AsignedServices.belongsTo(VehicleEntry, {
    foreignKey: 'placa',
    targetKey: 'placa'
});

AsignedServices.belongsTo(Employee, {
    foreignKey: 'id_trabajador',
    targetKey: 'cedula',
});

export { VehicleEntry, AsignedServices };