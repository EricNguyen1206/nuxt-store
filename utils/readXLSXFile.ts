import * as XLSX from "xlsx";

// read .xlsx file and return array object data
// line 1 in .xlsx file is key, others is value
export default async function (file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            return resolve(json);
        };
        reader.onerror = (error) => reject(error);
    });
}
