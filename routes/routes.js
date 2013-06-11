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

exports.getIngredientsByDrinkId = function(req,res){
	var ingredients = [];
	var drink_id_in = req.params.id;
	con.query("select C.ingredient_name from drink_content B left join drink A on A.drink_id = B.drink_id left join ingredient C on C.ingredient_id = B.ingredient_id where B.drink_id = " + drink_id_in, function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
         	console.log("hei");
         	var ingredient = {ingredient:  entry.ingredient_name};
         	ingredients.push(ingredient);
        });

        console.log(ingredients);
    	res.send(ingredients);
    });
};

exports.getAllIngredients = function(req,res){
	var ingredients = [];
	con.query("select ingredient_name from ingredient", function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
         	var ingredient = {ingredient:  entry.ingredient_name}; 
         	ingredients.push(ingredient);
        });

        console.log(ingredients);
    	res.send(ingredients);
    });
};

exports.getIngredientById = function(req,res){
	var ingredients = [];
	var ingredient_id_in = req.params.id;
	con.query("select ingredient_name from ingredient where ingredient_id = "+ingredient_id_in, function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
         	var ingredient = {ingredient:  entry.ingredient_name}; 
         	ingredients.push(ingredient);
        });

        console.log(ingredients);
    	res.send(ingredients);
    });
};

exports.getDrinkByIngredient = function (req,res){
	var ingredients_in = req.body;
	console.log(ingredients_in);
	res.send(ingredients_in);

	/*
	select  count(*) drinkCount, A.drink_name, A.drink_id
	from drink_content B
		left join drink A
		on A.drink_id = B.drink_id
		left join ingredient C
		on C.ingredient_id = B.ingredient_id
	where B.ingredient_id in(1,2,5,7,13)
	group by drink_name;

	*/
}