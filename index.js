const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Y1012Jqkhkp',
    database: 'contact_crm_db'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all contacts
app.get('/contacts', (req, res) => {
    mysqlConnection.query('SELECT * FROM ContactsTB1', (err, rows) => {
    console.log('rows :', rows);
        if (!err){
            res.send(rows);
        }
        else
            console.log(err);
    })
});

//Get an contacts
app.get('/contacts/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM ContactsTB1 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an contacts
app.delete('/contacts/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM ContactsTB1 WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an contacts
app.post('/contacts', (req, res) => {
    let con = req.body;
    var sql = "SET @id = ?;SET @first_name = ?;SET @last_name = ?;SET @email = ?;SET @mobile_number = ?\
    CALL ContactAddOrEdit(@id,@first_name,@last_name,@email,@mobile_number);";
    mysqlConnection.query(sql, [con.id, con.first_name, con.last_name, con.email ,con.mobile_number], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted contact id : '+element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an contacts
app.put('/contacts', (req, res) => {
    let con = req.body;
    var sql = "SET @id = ?;SET @first_name = ?;SET @last_name = ?;SET @email = ?;SET @mobile_number = ?\
    CALL ContactAddOrEdit(@id,@first_name,@last_name,@email,@mobile_number);";
    mysqlConnection.query(sql, [con.id, con.first_name, con.last_name, con.email ,con.mobile_number], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
