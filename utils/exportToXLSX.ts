import * as XLSX from "xlsx";

interface Row {
    [key: string]: string | number | boolean;
}

// export array object to .xlsx file
// first row in sheet show key as title
// litmit is Maximum number of rows per sheet
export default function (
    data: Row[],
    filename: string = "data",
    limit: number = 4
) {
    const numberOfSheets = Math.ceil(data.length / limit); // Calculate the number of sheets needed
    const workbook = XLSX.utils.book_new();

    // Split the data into batches of 4 rows and create a new worksheet for each batch
    for (let i = 0; i < numberOfSheets; i++) {
        const startRow = i * limit;
        const endRow = Math.min(startRow + limit, data.length);
        const batch = data.slice(startRow, endRow);
        const worksheet = XLSX.utils.json_to_sheet(batch);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Page ${i + 1}`);
    }

    XLSX.writeFile(workbook, `${filename}.xlsx`);
}
