import inquirer from "inquirer";
const createNewAccount = "Create a new account";
const useExistingAccount = "Use existing account";
const choicesOperations = [createNewAccount, useExistingAccount];
// Function to validate the name
const validateName = (input) => {
    const trimmedInput = input.trim();
    if (trimmedInput.length < 3 || trimmedInput.length > 25) {
        return "Name must contain between 3 and 25 characters.";
    }
    if (!/^[A-Za-z]+$/.test(trimmedInput)) {
        return "Name must contain only letters.";
    }
    return true;
};
// Function to validate the PIN
const validatePin = (input) => {
    if (!/^\d{4}$/.test(input)) {
        return "PIN must be exactly 4 digits.";
    }
    return true;
};
// Function to validate and parse the expiry month
const validateMonth = (input) => {
    if (!/^\d{2}$/.test(input)) {
        return "Month must be two digits.";
    }
    const monthNumber = parseInt(input, 10);
    if (monthNumber < 1 || monthNumber > 12) {
        return "Month must be between 01 and 12.";
    }
    return true;
};
// Function to validate the expiry year
const validateYear = (input) => {
    if (!/^\d{4}$/.test(input)) {
        return "Year must be four digits.";
    }
    return true;
};
// Function to validate CVV
const validateCvv = (input) => {
    if (!/^\d{3}$/.test(input)) {
        return "CVV must be exactly 3 digits.";
    }
    return true;
};
export async function userAction() {
    const user = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Choose any of the following",
            choices: choicesOperations,
        },
    ]);
    if (user.action === createNewAccount) {
        let createAccountCredentials;
        let pinValid = false;
        while (!pinValid) {
            createAccountCredentials = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter your Name",
                    validate: validateName,
                },
                {
                    name: "pin1",
                    type: "password",
                    message: "Enter your PIN",
                    validate: validatePin,
                },
                {
                    name: "pin2",
                    type: "password",
                    message: "Re-Enter your PIN",
                    validate: validatePin,
                },
                {
                    name: "type",
                    type: "list",
                    message: "Choose your card type",
                    choices: ["Visa", "MasterCard"],
                },
                {
                    name: "month",
                    type: "input",
                    message: "Enter your Card expiry month (MM)",
                    validate: validateMonth,
                },
                {
                    name: "year",
                    type: "input",
                    message: "Enter your Card expiry year (YYYY)",
                    validate: validateYear,
                },
                {
                    name: "cvv",
                    type: "input",
                    message: "Enter your CVV number",
                    validate: validateCvv,
                },
            ]);
            if (createAccountCredentials.pin1 === createAccountCredentials.pin2) {
                pinValid = true;
            }
            else {
                console.log("PINs do not match. Please try again.");
            }
        }
        const formattedExpiryDate = `${createAccountCredentials.month}/${createAccountCredentials.year}`;
        console.log(`Creating a new account with card name ${createAccountCredentials.name}, PIN ${createAccountCredentials.pin1}, card type ${createAccountCredentials.type}, expiry date ${formattedExpiryDate}, CVV ${createAccountCredentials.cvv}`);
    }
    else if (user.action === useExistingAccount) {
        const existingAccountCredentials = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter your Card Name",
                validate: validateName,
            },
            {
                name: "pin",
                type: "password",
                message: "Enter your PIN",
                validate: validatePin,
            },
        ]);
        console.log(`Logging in as ${existingAccountCredentials.name} with PIN ${existingAccountCredentials.pin}`);
    }
}
