const stringCalculator = require('../src/stringCalculator');

test('should return 0 for an empty string', () => {
    expect(stringCalculator("")).toBe(0);
});

test('should return the sum of comma-separated numbers', () => {
    expect(stringCalculator("1,2,3")).toBe(6);
});

test('should handle new lines as delimiters', () => {
    expect(stringCalculator("1\n2,3")).toBe(6);
});

test('should handle custom delimiters', () => {
    expect(stringCalculator("//;\n1;2")).toBe(3);
});

test('should throw an error with negative numbers', () => {
    expect(() => stringCalculator("1,-2,3")).toThrow("Negative numbers not allowed: -2");
});

test('should throw an error with multiple negative numbers', () => {
    expect(() => stringCalculator("//;\n1;-2;-3")).toThrow("Negative numbers not allowed: -2, -3");
});
