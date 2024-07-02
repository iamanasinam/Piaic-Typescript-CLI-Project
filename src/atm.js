import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import { userAction } from "./user.js";
import thankYouAscii from "./thankyou.js";
const validateNumber = (input) => {
    if (!/^\d+$/.test(input)) {
        return "Input must be a valid number.";
    }
    return true;
};
const readDataFromFile = (filename) => {
    if (!fs.existsSync(filename)) {
        return null;
    }
    const fileData = fs.readFileSync(filename, "utf-8");
    return JSON.parse(fileData);
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function userLogin() {
    const existingAccountCredentials = await inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: chalk.yellow("Enter your username"),
        },
        {
            name: "pin",
            type: "password",
            message: chalk.yellow("Enter your PIN"),
        },
    ]);
    const accountData = readDataFromFile("data.json");
    if (accountData) {
        let accountFound = false;
        for (let i = 0; i < accountData.length; i++) {
            if (accountData[i].username === existingAccountCredentials.username &&
                accountData[i].pin === existingAccountCredentials.pin) {
                accountFound = true;
                const showCredentials = () => {
                    console.log(chalk.blue.bold("\n\n=============================="));
                    console.log(chalk.blue.bold("     Account Details          "));
                    console.log(chalk.blue.bold("=============================="));
                    console.log(chalk.green.bold(`Name          : ${accountData[i].name}`));
                    console.log(chalk.green.bold(`Card Type     : ${accountData[i].type}`));
                    console.log(chalk.green.bold(`Expiry Date   : ${accountData[i].expiryDate}`));
                    console.log(chalk.green.bold(`CVV           : ${accountData[i].cvv}`));
                    console.log(chalk.green.bold(`Balance       : ${accountData[i].balance}`));
                    console.log(chalk.blue.bold("=============================="));
                };
                let exit = false;
                while (!exit) {
                    console.clear();
                    showCredentials();
                    const optPick = await inquirer.prompt([
                        {
                            name: "action",
                            type: "list",
                            message: chalk.yellow("Choose an action:"),
                            choices: ["Deposit", "Withdraw", "Transfer", "Exit"],
                        },
                    ]);
                    if (optPick.action === "Deposit") {
                        const Deposit = await inquirer.prompt([
                            {
                                name: "value",
                                type: "input",
                                message: chalk.yellow("Enter the deposit amount:"),
                                validate: validateNumber,
                            },
                        ]);
                        const depositValue = parseInt(Deposit.value, 10);
                        if (depositValue > 0) {
                            accountData[i].balance += depositValue;
                            fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
                            thankYouAscii();
                            console.log(chalk.green.bold(`Deposited ${Deposit.value} Rs. Your new balance is ${accountData[i].balance} Rs.`));
                            await delay(4000);
                        }
                        else {
                            console.log(chalk.red("Invalid deposit amount. Please enter a valid number."));
                        }
                    }
                    else if (optPick.action === "Withdraw") {
                        const Withdraw = await inquirer.prompt([
                            {
                                name: "value",
                                type: "input",
                                message: chalk.yellow("Enter the withdraw amount:"),
                                validate: validateNumber,
                            },
                        ]);
                        const withdrawValue = parseInt(Withdraw.value, 10);
                        if (withdrawValue > accountData[i].balance) {
                            console.log(chalk.red("Insufficient balance."));
                        }
                        else {
                            accountData[i].balance -= withdrawValue;
                            fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
                            thankYouAscii();
                            console.log(chalk.green(`Withdrew ${Withdraw.value} Rs. Your new balance is ${accountData[i].balance} Rs.`));
                            await delay(4000);
                        }
                    }
                    else if (optPick.action === "Transfer") {
                        const Transfer = await inquirer.prompt([
                            {
                                name: "to",
                                type: "input",
                                message: chalk.yellow("Enter the username:"),
                            },
                            {
                                name: "value",
                                type: "input",
                                message: chalk.yellow("Enter the transfer amount:"),
                                validate: validateNumber,
                            },
                        ]);
                        const transferValue = parseInt(Transfer.value, 10);
                        const recipient = accountData.find((acc) => acc.username === Transfer.to);
                        if (recipient &&
                            transferValue > 0 &&
                            accountData[i].balance >= transferValue) {
                            accountData[i].balance -= transferValue;
                            recipient.balance += transferValue;
                            fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
                            thankYouAscii();
                            console.log(chalk.green(`Transferred ${Transfer.value} Rs to ${Transfer.to}. Your new balance is ${accountData[i].balance} Rs.`));
                            await delay(4000);
                        }
                        else {
                            console.log(chalk.red("Invalid recipient or insufficient balance."));
                            await delay(4000);
                        }
                    }
                    else if (optPick.action === "Exit") {
                        console.clear();
                        thankYouAscii();
                        await delay(5000);
                        console.clear();
                        exit = true;
                    }
                }
                if (exit) {
                    userAction();
                }
                break;
            }
        }
        if (!accountFound) {
            console.log(chalk.red("Invalid Credentials"));
            await delay(4000);
            console.clear();
            userLogin();
        }
    }
    else {
        console.log(chalk.red("No account data found."));
        await delay(4000);
        console.clear();
        userAction();
    }
}
