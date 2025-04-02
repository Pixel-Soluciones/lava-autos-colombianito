import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

export const generateExcelReport = (worksheet: any[][], type: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = XLSX.utils.aoa_to_sheet(worksheet);

    const typeReport = type == 'D'? 'reporte-diario': 'reporte-mensual'

    XLSX.utils.book_append_sheet(workbook, worksheetData, typeReport);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `${typeReport}-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
};
