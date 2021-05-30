var express = require('express');
var app = express();
var bodyPanser = require('body-parser');

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
         <form action = "/todo" method="POST">
             <input name="id">
             <input name="Nama">
             <input name="alamat">
             <button>add</button>
         </form> 
         </body>  
        </html>`
    );
});

app.get('/todo', function(req, res) {
    con.query('SELECT * FROM pengunjung', (err, rows, field) => {
        if (err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.post('/todo', function(req, res) {
    var id = req.body.id;
    var Nama = req.body.Nama;
    var alamat = req.body.alamat;
    var sql = "INSERT INTO pengunjung (ID,Nama,alamat) VALUES ('" + id + "','" + Nama + "','" + alamat + "')";
    con.query(sql, function(err) {
        if (err) throw err;
    })
    res.end();
});

app.listen(3000);