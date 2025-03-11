import VehicleEntry from './vehicleEntry.model.js';
import AsignedServices from './asignedServices.model.js';

// Define associations
VehicleEntry.hasMany(AsignedServices, {
    foreignKey: 'placa',
    sourceKey: 'placa'
});

AsignedServices.belongsTo(VehicleEntry, {
    foreignKey: 'placa',
    targetKey: 'placa'
});




export { VehicleEntry, AsignedServices };