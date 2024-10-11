function stringCalculator(numbersStr) {
    if (numbersStr === "") return 0;

    // Split by comma and newline using regex
    const numbers = numbersStr.split(/[\n,]/);

    const sum = numbers.reduce((total, number) => {
        if (isNaN(number) || number === "") return total;
        return total + parseInt(number);
    }, 0);
    return sum;
}

// Examples:
console.log(stringCalculator("")); // Output: 0
console.log(stringCalculator("1,3")); // Output: 4
console.log(stringCalculator("1\n2,3")); // Output: 6
