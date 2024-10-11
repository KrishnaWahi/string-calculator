function stringCalculator(inputString) {
    if (inputString === "") return 0;
    let delimiter = /[,\n]/;
    let numbersStr = inputString;

    // Check for custom delimiter format: "//[delimiter]\n[numbers...]"
    if (inputString.startsWith("//")) {
        const delimiterEndIdx = inputString.indexOf("\n");

        // Extract the custom delimiter part
        const customDelimiterPart = inputString.substring(2, delimiterEndIdx);

        // Check if the delimiters are wrapped in brackets
        const bracketedDelimiters = customDelimiterPart.match(/\[(.*?)\]/g);
        if (bracketedDelimiters) {
            // Regex pattern for all custom delimiters found
            const escapedDelimiters = bracketedDelimiters.map(delim => delim.slice(1, -1).replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&'));
            delimiter = new RegExp(escapedDelimiters.join('|')); // Combining all delimiters with OR (|)
        } else {
            // No brackets, use the single custom delimiter
            delimiter = new RegExp(customDelimiterPart);
        }

        numbersStr = inputString.substring(delimiterEndIdx + 1); // Skipping custom delimiter
    }

    const numbers = numbersStr.split(delimiter);
    const negatives = [];

    const sum = numbers.reduce((total, number) => {
        if (isNaN(number) || number === "") return total;

        const parsedNumber = parseFloat(number);
        if (parsedNumber < 0) {
            negatives.push(parsedNumber);
        }

        return total + parsedNumber;
    }, 0);

    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
}

module.exports = stringCalculator;

// Examples:
// console.log(stringCalculator("")); // Output: 0
// console.log(stringCalculator("1,3")); // Output: 4
// console.log(stringCalculator("1\n2,3")); // Output: 6
// console.log(stringCalculator("//;\n1;2")); // Output: 3
// console.log(stringCalculator("1,-2,3")); // Throws: Negative numbers not allowed: -2
