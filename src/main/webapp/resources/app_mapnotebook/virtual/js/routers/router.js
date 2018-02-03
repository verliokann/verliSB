(function () {
    'use strict';

    App.Routers.Router = Backbone.Router.extend({

        routes: {
            "": "notes",
            "note/:id/:action": "note",
        },

        initialize: function (opts) {
            opts || (opts = {});
            this.notesView = opts.notesView || app.notesView;

            if (!this.notesView) {
                throw new Error("No notesView");
            }
            this.noteView = null;
        },

        notes: function () {
            this.notesView.render();
        },

        note: function (noteId, action) {
            if (this.noteView) {
                if (this.noteView.model.id === noteId) {
                    return this.noteView.trigger("update:" + action);
                } else {
                    this.noteView.remove();
                }
            }

            var model = this.notesView.collection.get(noteId);
            if (!model) {
                return this.navigate("", {trigger: true});
            }

            this.noteView = new App.Views.Note({model: model}, {
                action: action,
                nav: this.noteNavView
            });
            $("#note").html(this.noteView.render().$el);

        }

    });
}());
