$(function () {
    'use strict';

    app.collection = new App.Collections.Notes();

    app.notesView = new App.Views.Notes({
        collection: app.collection
    });

    app.router = new App.Routers.Router();

    app.collection.once("reset", function () {
        Backbone.history.start();
    });

    app.collection.fetch({reset: true});


});
