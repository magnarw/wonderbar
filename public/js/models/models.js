window.Ingredient = Backbone.Model.extend({

    urlRoot: "/ingredients"
});

window.IngredientCollection = Backbone.Collection.extend({

    model: Ingredient,

    url: "/ingredients"

});