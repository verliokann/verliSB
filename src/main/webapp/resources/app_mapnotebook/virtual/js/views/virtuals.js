(function () {
    'use strict';

    var ENTER = 13;

    App.Views.Notes = Backbone.View.extend({

        el: "#notes",

        events: {
            "click    #note-create": function () {
                this.createNote();
            },
            "keypress #note-new-input": function (ev) {
                this.enterNote(ev);
            }
        },

        initialize: function () {
            this.$input = this.$("#note-new-input");
            this.listenTo(this.collection, {
                "reset": function () {
                    this.addNotes();
                },
                "notes:add": function (m) {
                    this.addNote(m);
                }
            });

            this.filterView = new App.Views.NotesFilter({
                collection: this.collection
            });
        },

        render: function () {
            $(".region").not(".region-notes").hide();
            $(".region-notes").show();
            return this;
        },

        addNote: function (model) {
            var view = new App.Views.NotesItem({model: model});

            this.$("#notes-list tr")
                .filter(":last")
                .after(view.render().$el);
        },

        addNotes: function () {
            this.$("#notes-list tr.notes-item").remove();

            this.collection.chain()
                .sortBy(function (m) {
                    return m.get("createdAt");
                })
                .each(this.addNote, this);
        },

        enterNote: function (ev) {
            if (ev.which === ENTER) {
                this.createNote();
            }
        },

        createNote: function () {
            var input = this.$input.val().trim();
            this.$input.val("");

            if (input) {
                this.create(input);
            }
        },

        create: function (title) {
            var coll = this.collection;

            coll.create({name: title}, {
                success: function (colData, modelData) {
                    coll.trigger("notes:add", coll.get(modelData.id));
                }
            });
        }

    });
}());
