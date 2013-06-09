var express = require('express');
 
var mysql = require("mysql");
var con = mysql.createConnection({
        host:"46.137.184.176",
        user:"root",
        password:"treniva8227",
        database:"wunderbar",
        port:"3306"
});
con.connect();

var app = express();
 
app.get('/drinks', function(req, res) {
	  var drinks = [];
	   con.query("select * from drink", function(err, rows, fields) {
	   	console.log(err);
         rows.forEach(function(entry) {
         	console.log("hei");
         	var drink = {title:  entry.drink_name};
         	drinks.push(drink);
        });
         console.log(drinks);
    	res.send(drinks);
    });
});
 
app.listen(3000);
console.log('Listening on port 3000...');