var express = require('express'),
    drinks  = require('./routes/routes'),
    path = require('path');
 
var app = express();

app.configure(function(){
   app.use(express.static(path.join(__dirname, 'public'))); 
});

app.get('/drinks', drinks.getAllDrinks);
app.get('/drinks/:id', drinks.getDrinkById);
app.get('/drinks/ingredients/:id', drinks.getIngredientsByDrinkId);

app.get('/ingredients', drinks.getAllIngredients);
app.get('/ingredients/:id', drinks.getIngredientById);
 
app.post('/drinks', drinks.getDrinkByIngredient);

app.listen(3000);
console.log('Listening on port 3000...');