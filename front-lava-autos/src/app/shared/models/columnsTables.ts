import { Employee } from "./employee";
import { Entry } from "./entry";
import { MonthlyReport } from "./monthlyReport";

export const getEntityPropiedades = (entidad: string): Array<any> => {
    let resultados: any = [];
    let clase: any;

    switch (entidad) {
        case 'employees':
            clase = new Employee(); break;
        case 'entries':
            clase = new Entry(); break;
        case 'monthlyReport':
            clase = new MonthlyReport(); break;
    }

    if (clase) {
        resultados = Object.keys(clase).map(key => ({ key, value: clase[key] }));
    }
    return resultados
}