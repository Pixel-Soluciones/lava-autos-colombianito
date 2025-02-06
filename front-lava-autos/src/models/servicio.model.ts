import { Timestamp } from "rxjs";

export interface Servicio {
    id_servicio?: number;
    nombre_servicio: string;
    descrip_servicio: string;
    valor_servicio: number;
    tiempo_estimado: string;
}