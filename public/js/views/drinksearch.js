window.DrinkSearchView = Backbone.View.extend({

  el: '#drinkSearch',

  events: {
  	'click': 'searchForDrink'
  },

  searchForDrink: function(e){
  	e.preventDefault(); 
  	alert("Din hore!");
  }

});