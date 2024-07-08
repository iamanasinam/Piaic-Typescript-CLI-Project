import chalk from "chalk";
const validateUsername = (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 3 || trimmedInput.length > 15) {
        return chalk.red("Username must contain between 3 and 15 characters.");
    }
    if (!/^[A-Za-z0-9]+$/.test(trimmedInput)) {
        return chalk.red("Username must contain only letters and/or numbers.");
    }
    return true;
};
// Function to validate the name
const validateName = (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 3 || trimmedInput.length > 25) {
        return chalk.red("Name must contain between 3 and 25 characters.");
    }
    if (!/^[A-Za-z]+$/.test(trimmedInput)) {
        return chalk.red("Name must contain only letters.");
    }
    return true;
};
// Function to validate the PIN
const validatePin = (input) => {
    if (!/^\d{4}$/.test(input)) {
        return chalk.red("PIN must be exactly 4-four numbers.");
    }
    return true;
};
// Function to validate and parse the expiry month
const validateMonth = (input) => {
    if (!/^\d{2}$/.test(input)) {
        return chalk.red("Month must be 2-two numbers.");
    }
    const monthNumber = parseInt(input, 10);
    if (monthNumber < 1 || monthNumber > 12) {
        return chalk.red("Month must be between 01 and 12.");
    }
    return true;
};
// Function to validate the expiry year
const validateYear = (input) => {
    if (!/^\d{4}$/.test(input)) {
        return chalk.red("Year must be 4-four numbers.");
    }
    return true;
};
// Function to validate CVV
const validateCvv = (input) => {
    if (!/^\d{3}$/.test(input)) {
        return chalk.red("CVV must be exactly 3-three numbers.");
    }
    return true;
};
export { validateUsername, validateName, validatePin, validateYear, validateMonth, validateCvv };
