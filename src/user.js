import inquirer from "inquirer";
import fs from "fs";
import { userLogin } from "./atm.js";
import chalk from "chalk";
// Function to read data from a JSON file
const readDataFromFile = (filename) => {
    if (!fs.existsSync(filename)) {
        return null;
    }
    const fileData = fs.readFileSync(filename, "utf-8");
    return JSON.parse(fileData);
};
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
// Function to save data to data.json
const saveDataToFile = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};
export async function userAction() {
    const user = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: chalk.yellow("Choose any of the following"),
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
                    message: chalk.yellow("Enter your Name"),
                    validate: validateName,
                },
                {
                    name: "pin1",
                    type: "password",
                    message: chalk.yellow("Enter your PIN"),
                    validate: validatePin,
                },
                {
                    name: "pin2",
                    type: "password",
                    message: chalk.yellow("Re-Enter your PIN"),
                    validate: validatePin,
                },
                {
                    name: "type",
                    type: "list",
                    message: chalk.yellow("Choose your card type"),
                    choices: ["Visa", "MasterCard"],
                },
                {
                    name: "month",
                    type: "input",
                    message: chalk.yellow("Enter your Card expiry month (MM)"),
                    validate: validateMonth,
                },
                {
                    name: "year",
                    type: "input",
                    message: chalk.yellow("Enter your Card expiry year (YYYY)"),
                    validate: validateYear,
                },
                {
                    name: "cvv",
                    type: "input",
                    message: chalk.yellow("Enter your CVV number"),
                    validate: validateCvv,
                },
            ]);
            if (createAccountCredentials.pin1 === createAccountCredentials.pin2) {
                pinValid = true;
            }
            else {
                console.log(chalk.red("PINs do not match. Please try again."));
            }
        }
        const existingData = readDataFromFile("data.json");
        const formattedExpiryDate = `${createAccountCredentials.month}/${createAccountCredentials.year}`;
        let valuevalid = false;
        for (let i = 0; i < existingData.length; i++) {
            // console.log(`checking data for ${i} is ${existingData[i].name}`);
            if (existingData[i].name === createAccountCredentials.name) {
                valuevalid = true;
                break;
            }
        }
        if (valuevalid) {
            console.log(chalk.red("An account with this name and PIN already exists."));
            console.log(chalk.blue("Please Try Again"));
            setTimeout(() => {
                console.clear();
            }, 4000);
            setTimeout(() => {
                userAction();
            }, 4100);
        }
        else {
            console.log(chalk.green(`Creating a new account with card name ${createAccountCredentials.name}, PIN ${createAccountCredentials.pin1}, card type ${createAccountCredentials.type}, expiry date ${formattedExpiryDate}, CVV ${createAccountCredentials.cvv}`));
            // Save the data to data.json
            const accountData = {
                name: createAccountCredentials.name,
                pin: createAccountCredentials.pin1,
                type: createAccountCredentials.type,
                expiryDate: formattedExpiryDate,
                cvv: createAccountCredentials.cvv,
                balance: 0,
            };
            existingData.push(accountData);
            saveDataToFile("data.json", existingData);
            setTimeout(() => {
                console.clear();
            }, 4000);
            setTimeout(() => {
                userAction();
            }, 4100);
        }
    }
    else if (user.action === useExistingAccount) {
        userLogin();
    }
}
