var express = require('express');
var app = express();
var bodyPanser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: '3306',
    database: "data"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");
});

app.get('/', function(req, res) {
    res.send(
        `<html>
        <body>
         <form action = "/todo" method="POST" name>
             <input name="desk">
             <button>add</button>
         </form> 
         </body>  
        </html>`
    );
});

app.get('/todo', function(req, res) {
    con.query('SELECT * FROM todo', (err, rows, field) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.post('/todo', function(req, res) {
    var Desk = req.body.desk;
    var sql = "INSERT INTO todo (Desk) VALUES ('" + Desk + "')";
    con.query(sql, function(err) {
        if (err) throw err;
    })
    res.end();
});

app.delete('/todo/:id', (req, res) => {
    con.query("DELETE FROM data WHERE id='" + req.params.id + "'");
    res.end();
})
app.listen(3000);