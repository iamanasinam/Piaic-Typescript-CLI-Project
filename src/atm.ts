import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import { userAction } from "./user.js";
import thankYouAscii from "./thankyou.js";

const validateNumber = (input: string) => {
  // Check if the input is a valid number
  if (!/^\d+$/.test(input)) {
    return "Input must be a valid number.";
  }
  return true;
};

// Function to read data from a JSON file
const readDataFromFile = (filename: string) => {
  if (!fs.existsSync(filename)) {
    return null;
  }
  const fileData = fs.readFileSync(filename, "utf-8");
  return JSON.parse(fileData);
};

// Delay function to wait for a specified time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function userLogin() {
  // Prompt user for existing account credentials
  const existingAccountCredentials = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: chalk.yellow("Enter your Card Name"),
    },
    {
      name: "pin",
      type: "password",
      message: chalk.yellow("Enter your PIN"),
    },
  ]);

  // Read account data from file
  const accountData = readDataFromFile("data.json");

  if (accountData) {
    let accountFound = false;

    for (let i = 0; i < accountData.length; i++) {
      if (
        accountData[i].name === existingAccountCredentials.name &&
        accountData[i].pin === existingAccountCredentials.pin
      ) {
        accountFound = true;

        function showCredentials() {
          console.log(chalk.blue.bold("\n\n=============================="));
          console.log(chalk.blue.bold("     Account Details          "));
          console.log(chalk.blue.bold("=============================="));
          console.log(chalk.green.bold(`Name          : ${accountData[i].name}`));
          console.log(chalk.green.bold(`Card Type     : ${accountData[i].type}`));
          console.log(chalk.green.bold(`Expiry Date   : ${accountData[i].expiryDate}`));
          console.log(chalk.green.bold(`CVV           : ${accountData[i].cvv}`));
          console.log(chalk.green.bold(`Balance       : ${accountData[i].balance}`));
          console.log(chalk.blue.bold("=============================="));
        }

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
                type: "number",
                message: chalk.yellow("Enter the deposit amount:"),
                validate: validateNumber,
              },
            ]);
            if (Deposit.value.type === "number") {
            accountData[i].balance = accountData[i].balance + Deposit.value;
            fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
            thankYouAscii();
            console.log(chalk.green.bold(`Deposited ${Deposit.value} Rs. Your new balance is ${accountData[i].balance} Rs.`));

            await delay(4000); }
            else{
              console.log(chalk.red("Invalid input. Please enter a valid number."));
              console.log(chalk.red("Logging you out"))
              setTimeout(()=>{
                console.clear()
                userAction()
              },3000)
            }

          } else if (optPick.action === "Withdraw") {
            const Withdraw = await inquirer.prompt([
              {
                name: "value",
                type: "number",
                message: chalk.yellow("Enter the withdraw amount:"),
                validate: validateNumber,
              },
            ]);

            if (Withdraw.value > accountData[i].balance) {
              console.log(chalk.red("Insufficient balance."));
            } else {
              accountData[i].balance = accountData[i].balance - Withdraw.value;
              fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
              thankYouAscii();
              console.log(chalk.green(`Withdrew ${Withdraw.value} Rs. Your new balance is ${accountData[i].balance} Rs.`));

              await delay(4000); 
            }

          } else if (optPick.action === "Transfer") {
            const Transfer = await inquirer.prompt([
              {
                name: "to",
                type: "input",
                message: chalk.yellow("Enter the recipient's Card Name:"),
              },
              {
                name: "value",
                type: "number",
                message: chalk.yellow("Enter the transfer amount:"),
                validate: validateNumber,
              },
            ]);

            const recipient = accountData.find(
              (acc: any) => acc.name === Transfer.to
            );
            if (recipient && accountData[i].balance >= Transfer.value) {
              accountData[i].balance -= Transfer.value;
              recipient.balance += Transfer.value;
              fs.writeFileSync("data.json", JSON.stringify(accountData, null, 2));
              thankYouAscii();
              console.log(chalk.green(`Transferred ${Transfer.value} Rs to ${Transfer.to}. Your new balance is ${accountData[i].balance} Rs.`));

              await delay(4000); 
            } else {
              console.log(chalk.red("Invalid recipient or insufficient balance."));
              await delay(4000); 
            }

          } else if (optPick.action === "Exit") {
            console.clear(); 
            thankYouAscii(); 
            await delay(5000); 
            console.clear();
            exit = true;
          }
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
  } else {
    console.log(chalk.red("No account data found."));
    await delay(4000);
    console.clear();
    userAction();
  }
}
