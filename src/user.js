import inquirer from "inquirer";
import fs from "fs";
import { userLogin } from "./atm.js";
import chalk from "chalk";
import { validateUsername, validateName, validatePin, validateYear, validateMonth, validateCvv, } from "./validator.js";
const createNewAccount = "Create a new account";
const useExistingAccount = "Use existing account";
const choicesOperations = [createNewAccount, useExistingAccount];
// Function to read data from a JSON file
const readDataFromFile = (filename) => {
    if (!fs.existsSync(filename)) {
        return null;
    }
    const fileData = fs.readFileSync(filename, "utf-8");
    return JSON.parse(fileData);
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
        let createAccountusername;
        let createAccountPin;
        let createAccountCredentials;
        let pinValid = false;
        let existinggData = readDataFromFile("data.json") || [];
        while (!pinValid) {
            createAccountusername = await inquirer.prompt([
                {
                    name: "username",
                    type: "input",
                    message: chalk.yellow("Pick a username"),
                    validate: (input) => {
                        if (input.length <= 3) {
                            return chalk.red(validateUsername(input));
                        }
                        if (input.length > 3) {
                            for (let i = 0; i < existinggData.length; i++) {
                                if (input === existinggData[i].username) {
                                    return chalk.red("Username already exists. Please try something else.\nKindly change your username Now");
                                }
                            }
                        }
                        return true;
                    },
                },
                {
                    name: "name",
                    type: "input",
                    message: chalk.yellow("Enter your Name"),
                    validate: validateName,
                },
            ]);
            while (!pinValid) {
                createAccountPin = await inquirer.prompt([
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
                ]);
                if (createAccountPin.pin1 === createAccountPin.pin2) {
                    pinValid = true;
                }
                else {
                    console.log(chalk.red("PINs do not match. Please try again."));
                }
            }
            createAccountCredentials = await inquirer.prompt([
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
        }
        const existingData = readDataFromFile("data.json") || [];
        const formattedExpiryDate = `${createAccountCredentials.month}/${createAccountCredentials.year}`;
        console.log(chalk.green(`Creating a new account with card name ${createAccountusername.name}, Username ${createAccountusername.username} PIN ${createAccountPin.pin1}, card type ${createAccountCredentials.type}, expiry date ${formattedExpiryDate}, CVV ${createAccountCredentials.cvv}`));
        // Save the data to data.json
        const accountData = {
            name: createAccountusername.name,
            username: createAccountusername.username,
            pin: createAccountPin.pin1,
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
    else if (user.action === useExistingAccount) {
        userLogin();
    }
}
