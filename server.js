const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KOMAL',
  database: 'youthboost'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// API route
app.get('/profiles', (req, res) => {
  db.query('SELECT * FROM profiles', (err, results) => {
    if (err) {
      res.status(500).send('DB query error');
      return;
    }
    res.json(results);
  });
});

// Start server
app.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});
