var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "ingredients"		: "list"
    },

    initialize: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
         var ingredientsList = new IngredientCollection();
        ingredientsList.fetch({success: function(){
            $("#content").html(new IngredientsListView({model: ingredientsList}).el);
        }});
    },

	list: function() {
        var ingredientsList = new IngredientCollection();
        ingredientsList.fetch({success: function(){
            $("#content").html(new IngredientsListView({model: ingredientsList}).el);
        }});
    }
});

utils.loadTemplate(['HomeView', 'IngredientItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});