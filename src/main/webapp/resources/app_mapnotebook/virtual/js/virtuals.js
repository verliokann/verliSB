(function () {
    'use strict';

    App.Collections.Notes = Backbone.Collection.extend({
        model: App.Models.Virtual,
        url: "virtual_object"
    });

}());
