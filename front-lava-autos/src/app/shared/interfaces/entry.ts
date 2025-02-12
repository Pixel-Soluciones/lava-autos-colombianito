import { IServicio } from "app/shared/interfaces/servicio"
import { IEmployee } from "./employee"
import { IVehicle } from "./vehicle"

export interface IEntry{
    vehiculo: IVehicle[];
    servicio:  IServicio[];
    trabajador: IEmployee[];
    tipo_pago: string;
    estado: string;
}