window.IngredientsListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        console.log("prøver å rendre");
        var ingredients = this.model.models;
        var len = ingredients.length;

        $(this.el).html('<ul id="ingredientsList"></ul>');

        for (var i = 0; i < len; i++) {
            console.log("hei");
            $('#ingredientsList', this.el).append(new IngredientItemView({model: ingredients[i]}).render().el);
        }
        return this;
    }
});

window.IngredientItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});