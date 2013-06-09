var express = require('express');
 
var app = express();
 
app.get('/drinks', function(req, res) {
    res.send([{name:'Gin Tonic', ingredient:[{name:'Gin'}, {name:'Tonic'}]}, {name:'Long Island Iced Tea'}]);
});
 
app.listen(3000);
console.log('Listening on port 3000...');