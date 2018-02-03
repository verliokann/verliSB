(function () {
    'use strict';

    App.Views.NotesItem = Backbone.View.extend({

        id: function () {
            return this.model.id;
        },

        tagName: "tr",

        className: "notes-item",

        template: _.template(App.Templates["template-notes-item"]),

        events: {
            "click .note-view": function () {
                this.viewNote();
            },
            "click .note-edit": function () {
                this.editNote();
            },
            "click .note-delete": function () {
                this.deleteNote();
            }
        },

        initialize: function (attrs, opts) {

            opts || (opts = {});
            this.router = opts.router || app.router;

            this.listenTo(this.model, {
                "change": function () {
                    this.render();
                },
                "destroy": function () {
                    this.remove();
                }
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        viewNote: function () {
            var coords = [this.model.get('latitude'), this.model.get('longitude')];
            viewPlacemark(coords)
        },

        editNote: function () {
            var loc = ["note", this.model.id, "edit"].join("/");
            this.router.navigate(loc, {trigger: true});
        },

        deleteNote: function () {
            this.model.destroy();
        }

    });
}());
