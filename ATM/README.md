
# CLI ATM System

**Overview**

The CLI ATM System is a command-line interface (CLI) application that simulates a banking ATM. It allows users to create new accounts, log in to existing accounts, and perform various transactions such as deposits, withdrawals, and transfers.


## Features

- **Create New Account:** Users can create a new account by providing their name, PIN, card type, expiry date, and CVV.

 - **Login:** Existing users can log in using their card name and PIN.

 - **Account Operations:**
    - **Deposit:** Add funds to the account.
    - **Withdraw:** Withdraw funds from the account.
    - **Transfer:** Transfer funds to another account.
 - **Account Summary:** Display account details including balance.



## Installation

1. Clone the repository:

```bash
git clone https://github.com/iamansiinam/ts-calculator-cli.git
cd atm
```
2. Install dependencies:
```bash
npm install
```
## Usage

**Running the Application**

```bash
node index.js
```


## Commands and Prompts

Upon starting the application, you will be prompted to either create a new account or use an existing account.

**1. Create a New Account:**

 - Enter your name (3-25 characters, letters only).
 - Set and confirm your PIN (4 digits).
 - Choose your card type (Visa or MasterCard).
 - Enter your card's expiry month and year.
 - Enter your CVV (3 digits).

**2. Use Existing Account:**

 - Enter your card name.
 - Enter your PIN.

**3. Account Operations (After logging in):**

 - **Deposit:** Enter the amount to deposit.
 - **Withdraw:** Enter the amount to withdraw.
 - **Transfer:** Enter the recipient's card name and amount to transfer.
 - **Exit:** Exit the application and print a thank-you message.

## File Structure
 - **index.js:** Entry point of the application.
 - **src/user.js:** Contains functions related to user actions, including account creation and login.
 - **src/atm.js:** Handles ATM operations such as deposit, withdraw, and transfer.
 - **data.json:** Stores account data. This file is automatically created and updated by the application.
 - **thankyou.js:** Contains a function to print a thank-you ASCII art message.

## Example

**Create a New Account**

```
Enter your Name: anas
Enter your PIN: ****
Re-Enter your PIN: ****
Choose your card type: Visa
Enter your Card expiry month (MM): 12
Enter your Card expiry year (YYYY): 2025
Enter your CVV number: 123
```

**Use Existing Account**
```
Enter your Card Name: anas
Enter your PIN: ****
```
**Account Operations**
```
Choose an action:
1. Deposit
2. Withdraw
3. Transfer
4. Exit
```
## Validation Rules

 - **Name:** 3-25 characters, letters only.
 - **PIN:** Exactly 4 digits.
 - **Expiry Month:** 01 to 12.
 - **Expiry Year:** 4 digits.
 - **CVV:** Exactly 3 digits.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact
For any inquiries or issues, please contact me at iamanasinam@gmail.com
