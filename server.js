const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // 如果有密码，请填入你的密码
    database: 'demo'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ id: result.insertId, ...newUser });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});