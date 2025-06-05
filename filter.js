const fs = require('fs');
const { argv } = require('process');

if (argv.length < 4) {
    console.error('Usage: node filter.js <input-file> <output-file>');
    process.exit(1);
}

const inputFile = argv[2];
const outputFile = argv[3];
console.log(`Input file ${inputFile}`);
console.log(`Output file ${outputFile}`);

try {
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const jsonData = JSON.parse(rawData);

    const filteredData = jsonData.filter(entry => {
        const filePath = entry.file || '';
        return !filePath.includes('/external/') && !filePath.includes('/_deps/');
    });

    fs.writeFileSync(outputFile, JSON.stringify(filteredData, null, 2));
    console.log(`Filtered data saved to ${outputFile}`);

} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}