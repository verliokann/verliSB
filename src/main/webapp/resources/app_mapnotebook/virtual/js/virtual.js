(function () {
    'use strict';

    App.Models.Virtual = Backbone.Model.extend({

        defaults: function () {
            return {
                name: "name",
                latitude: 0.0,
                longitude: 0.0,
                description: "description"
            };
        }

    });
}());
