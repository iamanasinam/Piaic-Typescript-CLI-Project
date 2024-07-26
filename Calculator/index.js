import chalk from "chalk";
import inquirer from "inquirer";
const Addition = "Addition => +";
const Subtraction = "Subtraction => -";
const Multiplication = "Multiplication => x";
const Division = "Division => /";
const operationChoices = [Addition, Subtraction, Multiplication, Division];
// Function to gather multiple values from the user
const getValues = async (numValues) => {
    const values = [];
    for (let i = 0; i < numValues; i++) {
        const value = await inquirer.prompt([
            {
                name: `value${i + 1}`,
                type: "number",
                message: `Enter value ${i + 1}:`,
            },
        ]);
        values.push(value[`value${i + 1}`]);
    }
    return values;
};
// Function to perform calculations based on user input
const performCalculation = async () => {
    const operationInquirer = await inquirer.prompt([
        {
            name: "operationProperty",
            type: "list",
            message: "Which operation do you want to perform:",
            choices: operationChoices,
        },
    ]);
    const selectedOperation = operationInquirer.operationProperty;
    console.log(chalk.blue(`Selected Operation: ${selectedOperation}`));
    const validateNumberInput = async (message) => {
        while (true) {
            const input = await inquirer.prompt([
                {
                    name: "valueNeeded",
                    type: "number",
                    message: message,
                },
            ]);
            if (input.valueNeeded >= 2) {
                return input.valueNeeded;
            }
            else {
                console.log(chalk.red("You must enter a number greater than or equal to 2.\n"));
            }
        }
    };
    if (selectedOperation === Addition) {
        const additionInputNo = await validateNumberInput("How many values do you want to add:");
        const additionInputValues = await getValues(additionInputNo);
        console.log(chalk.green(`Adding values: ${additionInputValues.join(", ")}`));
        const additionResult = additionInputValues.reduce((acc, val) => acc + val, 0);
        console.log(chalk.green(`The result of adding is: ${additionResult}\n`));
    }
    else if (selectedOperation === Subtraction) {
        const subtractionInputNo = await validateNumberInput("How many values do you want to subtract:");
        const subtractionInputValues = await getValues(subtractionInputNo);
        console.log(chalk.yellow(`Subtracting values: ${subtractionInputValues.join(", ")}`));
        const subtractionResult = subtractionInputValues.reduce((acc, val) => acc - val);
        console.log(chalk.yellow(`The result of subtracting is: ${subtractionResult}\n`));
    }
    else if (selectedOperation === Multiplication) {
        const multiplicationInputNo = await validateNumberInput("How many values do you want to multiply:");
        const multiplicationInputValues = await getValues(multiplicationInputNo);
        console.log(chalk.magenta(`Multiplying values: ${multiplicationInputValues.join(", ")}`));
        const multiplicationResult = multiplicationInputValues.reduce((acc, val) => acc * val, 1);
        console.log(chalk.magenta(`The result of multiplying is: ${multiplicationResult}\n`));
    }
    else if (selectedOperation === Division) {
        const divisionInputVal = await inquirer.prompt([
            {
                name: "value1",
                type: "number",
                message: "Enter the value you want to be divided:",
            },
            {
                name: "value2",
                type: "number",
                message: "Divide the above value by:",
            },
        ]);
        console.log(chalk.cyan(`Value after dividing ${divisionInputVal.value1} by ${divisionInputVal.value2} is: ${divisionInputVal.value1 / divisionInputVal.value2}\n`));
    }
    else {
        console.log(chalk.red("Invalid operation selected."));
    }
};
// Main function to run the calculator program
const runCalculator = async () => {
    let continueCalculation = true;
    while (continueCalculation) {
        await performCalculation();
        const continueInquirer = await inquirer.prompt([
            {
                name: "continue",
                type: "confirm",
                message: "Do you want to perform another calculation?",
                default: false,
            },
        ]);
        continueCalculation = continueInquirer.continue;
    }
    console.log(chalk.blue("Thanks for using this calculator!"));
};
// Run the calculator program
runCalculator();
