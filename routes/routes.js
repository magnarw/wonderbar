var mysql = require("mysql");

var con = mysql.createConnection({
        host:"46.137.184.176",
        user:"root",
        password:"treniva8227",
        database:"wunderbar",
        port:"3306"
});
con.connect(); 

exports.getAllDrinks = function(req,res){
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
};

exports.getDrinkById = function(req,res){
	var drinks = [];
	var drink_id_in = req.params.id;
	con.query("select * from drink where drink_id = " + drink_id_in, function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
         	console.log("hei");
         	var drink = {drink:  entry.drink_name};
         	drinks.push(drink);
        });

        console.log(drinks);
    	res.send(drinks);
    });
};



