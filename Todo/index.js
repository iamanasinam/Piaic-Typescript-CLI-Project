import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
// create a choice for todos
const createNewTodo = chalk.yellow("Create a new Todo");
const editTodo = chalk.yellow("Edit Todo");
const deleteTodo = chalk.yellow("Delete Todo");
const exitTodo = chalk.yellow("Exit Todo");
const choicesOperation = [createNewTodo, editTodo, deleteTodo, exitTodo];
// create object for storing the todo list
let todos = JSON.parse(fs.readFileSync("todos.json", "utf8")) || [];
// Validation functions
const validateTitle = (input) => {
    if (!input) {
        return "Title cannot be empty!";
    }
    if (input.length < 3) {
        return "Title must contain at least 3 words!";
    }
    return true;
};
const validateDescription = (input) => {
    if (!input) {
        return "Description cannot be empty!";
    }
    if (input.length < 3) {
        return "Description must contain at least 3 words!";
    }
    return true;
};
// Function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function main() {
    while (true) {
        console.clear();
        if (todos.length < 1) {
            console.clear();
            console.log(chalk.red("Currently there is no todo"));
        }
        else {
            console.clear();
            // console.log(chalk.blue("================================================================"));
            // console.log(chalk.blue("================================================================"));
            console.log(chalk.green("Todos List: ", todos.length));
            todos.forEach((todo) => {
                console.log(chalk.yellow("\nId:"), chalk.green(todo.id), chalk.yellow(" Title: "), chalk.green(todo.title), chalk.yellow(" Description: "), chalk.green(todo.description));
            });
            console.log(chalk.green("\n\n========================================="));
            // console.log(chalk.blue("================================================================\n\n"));
        }
        const todoQuestion = await inquirer.prompt([
            {
                type: "list",
                name: "todo",
                message: chalk.yellow("What would you like to do?"),
                choices: choicesOperation,
            },
        ]);
        if (todoQuestion.todo === createNewTodo) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: chalk.yellow("Enter the title of the todo:"),
                    validate: validateTitle,
                },
                {
                    type: "input",
                    name: "description",
                    message: chalk.yellow("Enter the description of the todo:"),
                    validate: validateDescription,
                },
            ]);
            todos.push({
                id: todos.length + 1,
                title: answers.title,
                description: answers.description
            });
            fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
            console.log(chalk.green("Todo created successfully!"));
            await delay(3000); // Wait for 3 seconds
        }
        else if (todoQuestion.todo === editTodo) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: chalk.yellow("Enter the id of the todo to edit:"),
                },
            ]);
            const todoIndex = todos.findIndex((todo) => todo.id === parseInt(answers.id));
            if (todoIndex !== -1) {
                const newAnswers = await inquirer.prompt([
                    {
                        type: "input",
                        name: "title",
                        message: chalk.yellow("Enter the new title of the todo:"),
                        validate: validateTitle,
                    },
                    {
                        type: "input",
                        name: "description",
                        message: chalk.yellow("Enter the new description of the todo:"),
                        validate: validateDescription,
                    },
                ]);
                todos[todoIndex].title = newAnswers.title;
                todos[todoIndex].description = newAnswers.description;
                fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
                console.log(chalk.green("Todo updated successfully!"));
            }
            else {
                console.log(chalk.red("Todo not found!"));
            }
            await delay(3000); // Wait for 3 seconds
        }
        else if (todoQuestion.todo === deleteTodo) {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: chalk.yellow("Enter the id of the todo to delete:"),
                },
            ]);
            const todoIndex = todos.findIndex((todo) => todo.id === parseInt(answers.id));
            if (todoIndex !== -1) {
                todos.splice(todoIndex, 1);
                fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));
                console.log(chalk.green("Todo deleted successfully!"));
            }
            else {
                console.log(chalk.red("Todo not found!"));
            }
            await delay(3000); // Wait for 3 seconds
        }
        else if (todoQuestion.todo === exitTodo) {
            console.clear();
            console.log(chalk.green("Exiting..."));
            await delay(3000);
            console.clear();
            break;
        }
    }
}
// Run the main function
main();
