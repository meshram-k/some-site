const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const { json } = require('stream/consumers');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SERVER_PORT = 9898;
const CLIENT_PORT = 5500;

// CORS configuration isse dekh lena
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', `http://127.0.0.1:${CLIENT_PORT}`);
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });
app.use(cors());



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Test@123',
  database: 'test'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Login
app.post('/signin', (request, response) => {
  const { id, password } = request.body;

  const signinQuery = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.query(signinQuery, [id, password], (error, results) => {
    if (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: 'Login failed due to server error',
      });
    }

    if (results.length === 0) {
      return response.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Successful login
    response.status(200).json({
      success: true,
      message: `Welcome ${results[0].name}!`,
      user: {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
      },
    });
  });
});

// Sign Up
app.post('/signup', (request, response) => {

  const { username, id, password } = request.body;

  // check if the user already exists
  const checkUserQuery = `SELECT email from users where email = ?`;
  db.query(checkUserQuery, [id], (error, userResults) => {
    if (error) {
      console.error(error);
      return;
    }
    if (userResults.length > 0) {
      return response.status(409).json({
        success: false,
        message: 'User already exists!',
      });
    }

    const insertQuery = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [generateUUID(), username, id, password];

    db.query(insertQuery, values, (error, results) => {
      if (error) return response.status(500).json({
        success: false, message: 'Signup failed!'
      });
      response.status(201).json({ success: true, message: "Account created successfully!\nNow you can login" });
    });
  });
});

// Start server
app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}`);
});


// Ye random Id generate krke tere SQL me store karega
function generateUUID() {
  return 'xx-xx-4x-yx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


