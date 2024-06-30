let user ={
    "name": "anas",
    "pin": "0000",
    "type": "MasterCard",
    "expiryDate": "12/2022",
    "cvv": "599",
    "balance": 0
  }

  // show the atm information

  console.log(`Welcome to ATM ${user.name}! Your current balance is ${user.balance} Euros.`);

  // deposit money
  function deposit(amount: number) {
    if (amount > 0) {
      user.balance += amount;
      console.log(`Deposited ${amount} Euros. Your new balance is ${user.balance} Euros.`);
    } else {
      console.log("Invalid deposit amount.");
    }
  }


  deposit(100);

  // withdraw money
  function withdraw(amount: number) {
    if (amount > 0 && amount <= user.balance) {
      user.balance -= amount;
      console.log(`Withdrew ${amount} Euros. Your new balance is ${user.balance} Euros.`);
    } else {
      console.log("Invalid withdrawal amount or insufficient funds.");
    }
  }

  withdraw(50);

  // check balance
  function checkBalance() {
    console.log(`Your current balance is ${user.balance} Euros.`);
  }

  checkBalance();

  // display card information
  function displayCardInfo() {
    console.log(`Card holder: ${user.name}`);
    console.log(`Card type: ${user.type}`);
    console.log(`Expiry date: ${user.expiryDate}`);
    console.log(`CVV: ${user.cvv}`);
  }

  displayCardInfo();

  // exit the program
  function exitProgram() {
    console.log("Thank you for using our ATM. Goodbye!");
    process.exit(0);
  }

  exitProgram();

  
