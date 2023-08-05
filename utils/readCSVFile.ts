// read file .csv and return matrix data
// output not have key or header to index data
export default async function (file: File): Promise<string[][]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () =>
            resolve(
                (reader.result as string)
                    .split("\n")
                    .map((line) => line.split(","))
            );
        reader.onerror = (error) => reject(error);
    });
}
