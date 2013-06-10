var express = require('express'),
    drinks  = require('./routes/routes');
 
var app = express();

app.get('/drinks', drinks.getAllDrinks);
app.get('/drinks/:id', drinks.getDrinkById);
 
app.listen(3000);
console.log('Listening on port 3000...');