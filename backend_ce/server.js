const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Civil Estimation Backend Running');
});

app.post('/add-project', (req, res) => {

    const {
        project_name,
        client_name,
        cement_cost,
        steel_cost,
        labor_cost
    } = req.body;

    const total_cost =
        Number(cement_cost) +
        Number(steel_cost) +
        Number(labor_cost);

    const sql = `
    INSERT INTO projects
    (
      project_name,
      client_name,
      cement_cost,
      steel_cost,
      labor_cost,
      total_cost
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(
        sql,
        [
            project_name,
            client_name,
            cement_cost,
            steel_cost,
            labor_cost,
            total_cost
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send('Error inserting data');
            } else {
                res.send('Project Added Successfully');
            }
        }
    );
});

app.get('/projects', (req, res) => {

    const sql = 'SELECT * FROM projects';

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});