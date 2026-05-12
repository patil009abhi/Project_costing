// const mysql = require('mysql2');

// function createConnection() {
//   const connection = mysql.createConnection({
//     host: 'mysql-container',
//     user: 'root',
//     password: 'ce_password',
//     database: 'civil_estimation'
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.log('❌ DB connection failed. Retrying in 5 sec...', err.message);
//       setTimeout(createConnection, 5000);
//     } else {
//       console.log('✅ Connected to MySQL');
//     }
//   });

//   connection.on('error', (err) => {
//     console.log('❌ DB error:', err.message);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       createConnection();
//     }
//   });

//   return connection;
// }

// module.exports = createConnection();


// (The above script needs to be updated since if the query fails at first instance, the db gets disconnected..)

// Use tables ;
// CREATE TABLE projects (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     project_name VARCHAR(255) NOT NULL,
//     client_name VARCHAR(255) NOT NULL,
//     cement_cost DECIMAL(10,2) DEFAULT 0,
//     steel_cost DECIMAL(10,2) DEFAULT 0,
//     labor_cost DECIMAL(10,2) DEFAULT 0,
//     total_cost DECIMAL(10,2) DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// For Compose Use host: 'mysql'
// While for individual container use host: 'mysql-container' 

// (The below script is the updated version of above script so as 1st request or query gets disconnected, the db gets connected again from pool itself)

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'ce_password',
  database: 'civil_estimation',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ MySQL Pool Connected');
    connection.release();
  }
});

module.exports = pool;