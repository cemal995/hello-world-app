const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'db',  
    user: 'user',  
    password: 'password',  
    database: 'mydatabase'  
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// POST route to handle form submission
app.post('/submit', (req, res) => {
    const { email, name, surname } = req.body;
    
    const query = 'INSERT INTO subscribers (email, name, surname) VALUES (?, ?, ?)';
    db.query(query, [email, name, surname], (err, result) => {
        if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'You are added to the mailing list!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
