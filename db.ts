import mysql from 'mysql2/promise';

// Create a connection to the database
async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
  });

  // Test the connection
  try {
    await connection.connect();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
  }

  // Example query
  try {
    const [rows] = await connection.execute('SELECT * FROM your_table');
    console.log(rows);
  } catch (error) {
    console.error('Error executing query:', error);
  }

  // Close the connection
  await connection.end();
}

connectToDatabase();
