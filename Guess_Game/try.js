import inquirer from "inquirer";
import chalk from "chalk";
// Function to play the game
const playGame = async () => {
    // Generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.clear();
    console.log(chalk.green(`Generated Number (for testing): ${randomNumber}`));
    console.log(chalk.yellow("Number is between 0 and 100.\nYou have 5 attempt\n"));
    // Set the number of attempts
    let attempts = 5;
    // Game loop
    while (attempts > 0) {
        const guess = await inquirer.prompt([
            {
                type: "input",
                name: "value",
                message: chalk.yellow("Guess a number :"),
                validate: function (value) {
                    const valid = !isNaN(parseFloat(value)) &&
                        Number.isInteger(parseFloat(value)) &&
                        value >= 1 &&
                        value <= 100;
                    if (valid) {
                        return true;
                    }
                    else {
                        return chalk.red("Please enter a valid number between 1 and 100.");
                    }
                },
            },
        ]);
        attempts--;
        if (parseInt(guess.value) === randomNumber) {
            console.log(chalk.green("Congratulations, you guessed the number!\n"));
            break;
        }
        else if (parseInt(guess.value) > randomNumber) {
            console.log(chalk.red("Too High! \n\nYou have", chalk.yellow(attempts), "attempts left."));
        }
        else if (parseInt(guess.value) < randomNumber) {
            console.log(chalk.red("Too Low! \n\nYou have", chalk.yellow(attempts), "attempts left."));
        }
        else if (attempts === 0 && parseInt(guess.value) == randomNumber) {
            console.log(chalk.red("\nYou Lost! \nThe number was", chalk.yellow(randomNumber)));
        }
    }
    // Ask the user if they want to play again
    const { playAgain } = await inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: chalk.yellow("Do you want to play again?"),
        },
    ]);
    if (playAgain) {
        console.clear();
        playGame(); // Recursively call playGame to start a new game
    }
    else {
        console.clear();
        console.log(chalk.green("Thanks for playing!"));
    }
};
// Start the game for the first time
playGame();
