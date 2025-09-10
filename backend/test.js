// mysql-connection.mjs
import mysql from 'mysql2/promise';

const connectToMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',     // Docker MySQL exposed port
      port: 3306,
      user: 'root',
      password: 'nexus',      // Change to your DB name
    });

    console.log('✅ Connected to MySQL!');

    const [rows] = await connection.query('SELECT NOW() AS now');
    console.log('🕒 Current MySQL Time:', rows[0].now);

    await connection.end();
    console.log('🔌 Connection closed.');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
};

connectToMySQL();
