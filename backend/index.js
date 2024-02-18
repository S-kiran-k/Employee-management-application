const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'employee_db', // Update to the correct database name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

app.post('/employees', (req, res) => {
    const { name, employee_id, department, dob, gender, designation, salary } = req.body;
    if (!name || !employee_id || !department || !dob || !gender || !designation || !salary) {
        return res.status(400).send('Incomplete data');
    }

    if (name.length > 30 || salary > 99999999) {
        return res.status(400).send('Invalid data');
    }

    const dobDate = new Date(dob); // Convert string dob to Date object
    if (isNaN(dobDate.getTime())) {
        return res.status(400).send('Invalid date of birth');
    }

    const sql = 'INSERT INTO emp (name, employee_id , department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, employee_id, department, dobDate, gender, designation, salary], (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            return res.status(500).send('Error adding employee');
        }
        console.log('Insertion result:', result);
        res.status(200).send('Employee added successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
