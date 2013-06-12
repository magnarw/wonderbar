var mysql = require("mysql");

var con = mysql.createConnection({
        host:"46.137.184.176",
        user:"root",
        password:"treniva8227",
        database:"wunderbar",
        port:"3306"
});
con.connect(); 

/*
	In: 
	OUt: Get all drinks

	Test with GET
	http://localhost:3000/drink

*/

exports.getAllDrinks = function(req,res){
	var drinks = [];
	var queryString = "select * from drink";
	con.query(queryString, function(err, rows, fields) {
	   	
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


/*
	In: Drink id
	OUt: drink name

	Test with GET
	http://localhost:3000/drink/1
*/
exports.getDrinkById = function(req,res){
	var drinks = [];
	var drink_id_in = req.params.id;

	console.log(req.header);

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


/*
	In: Drink id
	OUt: ingredients for that drink

	Test with GET
	http://localhost:3000/drink/ingredients/1

*/
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

/*
	In: 
	OUt: All ingredients

	Test with GET
	http://localhost:3000/ingredients

*/
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



/*
	In: Ingredient id
	OUt: ingredient name

	Test with GET
	http://localhost:3000/ingredients/3

*/
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


/*
	In: Ingredient ids
	Out: Drinks that match by ingredients

	TEst with POST, 
	Content-Type: application/json
	[  {    "id": "1"  },  {    "id": "2"  },  {    "id": "7"  },  {    "id": "13"  },  {    "id": "5"  } ]
*/
exports.searchForDrinkByIngredient = function (req,res){
	
	var ingredients_in = req.body;

	var queryString = "";

	queryString += "select count(*) drinkCount, A.drink_name, A.drink_id "
	queryString += "from drink_content B ";
	queryString += "left join drink A ";
	queryString += "on A.drink_id = B.drink_id ";
	queryString += "left join ingredient C ";
	queryString += "on C.ingredient_id = B.ingredient_id ";
	queryString += "where B.ingredient_id in(";

	for(var i = 0; i < ingredients_in.length - 1; i++){

		queryString += ingredients_in[i].id + ", ";
		
	}

	queryString += ingredients_in[ingredients_in.length-1].id;
	queryString += ") ";
	queryString += "group by drink_name ";
	queryString += "order by drinkCount DESC;";

	console.log(queryString);

	var drinks = [];

	con.query(queryString, function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
        	var tempDrink = [];
        	var matchCount 	= {matches: entry.drinkCount};
         	var drink 		= {drink:  entry.drink_name};
         	var drink_id 	= {id: entry.drink_id}; 
         	
         	tempDrink.push(drink);
         	tempDrink.push(drink_id);
         	tempDrink.push(matchCount);
         	drinks.push(tempDrink);
        });

        console.log(drinks);
    	res.send(drinks);
    });

}



/*
	In: Ingredient name or beginning characters of an ingredient.
	OUt: Ingredient_id and ingredient name of all ingredients that starts with those characters.

	Test with POST
	Content-Type: application/json
	[  {    "name": "co"  } ]

*/
exports.searchForIngredient = function(req,res){

	var ingredients = [];
	var ingredient_name_in = req.body[0].name;

	var queryString = "select ingredient_id,ingredient_name from ingredient where ingredient_name like '"+ingredient_name_in+"%'";
	console.log(queryString);
	con.query(queryString, function(err, rows, fields) {
	   	
	   	console.log(err);
        
        rows.forEach(function(entry) {
        	var tempIngredient = [];

         	var ingredient = {ingredient_name:  entry.ingredient_name}; 
         	var ingredient_name = {ingredient_id:  entry.ingredient_id}; 

			tempIngredient.push(ingredient);
			tempIngredient.push(ingredient_name);

         	ingredients.push(tempIngredient);
        });

        console.log(ingredients);
    	res.send(ingredients);
    });
};