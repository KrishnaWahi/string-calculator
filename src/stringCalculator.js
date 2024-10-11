function stringCalculator(inputString) {
    if (inputString === "") return 0;
    let delimiter = /[,\n]/;
    let numbersStr = inputString

    // Check for custom delimiter format: "//[delimiter]\n[numbers...]"
    if (inputString.startsWith("//")) {
        const delimiterEndIdx = inputString.indexOf("\n");
        delimiter = new RegExp(inputString.substring(2, delimiterEndIdx)); // Extracting custom delimiter
        numbersStr = inputString.substring(delimiterEndIdx + 1); // Skipping custom delimiter
    }

    // Split by comma and newline using regex
    const numbers = numbersStr.split(delimiter);
    const negatives = [];

    // Calculating sum
    const sum = numbers.reduce((total, number) => {
        if (isNaN(number) || number === "") return total;

        const parsedNumber = parseInt(number)
        if (parsedNumber < 0) {
            negatives.push(parsedNumber);
        }

        return total + parsedNumber;
    }, 0);

    // If any negative numbers are found, throw an exception
    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
}

// Examples:
console.log(stringCalculator("")); // Output: 0
console.log(stringCalculator("1,3")); // Output: 4
console.log(stringCalculator("1\n2,3")); // Output: 6
console.log(stringCalculator("//;\n1;2")); // Output: 3

// Throws: Negative numbers not allowed: -2
console.log(stringCalculator("1,-2,3")); 
