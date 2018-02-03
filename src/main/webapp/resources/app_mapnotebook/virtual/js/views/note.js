(function () {
    'use strict';

    App.Views.Note = Backbone.View.extend({

        id: "note-panes",

        template: _.template(App.Templates["template-note"]),

        events: {
            "blur   #note-form-edit": "saveNote",
            "submit #note-form-edit": function () {
                return false;
            }
        },

        initialize: function (attrs, opts) {

            $('#myNode').on('hidden.bs.modal', function () {
                // $('#myNode').unbind('hidden.bs.modal');
                app.router.navigate('', {replace: true});
            });

            opts || (opts = {});

            this.nav = opts.nav;
            this.router = opts.router || app.router;

            if (!this.router) {
                throw new Error("No router");
            }

            this._addListeners();

            this.$el.html(this.template(this.model.toJSON()));
            this.update(opts.action || "view");
            this.render();
        },

        _addListeners: function () {
            this.listenTo(this.model, {
                "destroy": function () {
                    this.remove();
                },
                "change": function () {
                    this.render().model.save();
                }
            });

            this.on({
                "update:view": function () {
                    this.render().viewNote();
                },
                "update:edit": function () {
                    this.render().editNote();
                }
            });
        },

        render: function () {
            $(".region-note").show();
            $("#myNode").modal('show');
            return this;
        },

        remove: function () {
            Backbone.View.prototype.remove.call(this);
        },

        update: function (action) {
            action = action || this.action || "view";
            var paneEl = "#note-pane-" + action,
                loc = "note/" + this.model.id + "/" + action;

            this.$(".pane").not(paneEl).hide();
            this.$(paneEl).show();

            if (this.action !== action) {
                this.action = action;
                this.router.navigate(loc, {replace: true});
            }
        },

        viewNote: function () {
            this.update("view");
        },
        editNote: function () {
            this.update("edit");
        },

        deleteNote: function () {
            if (confirm("Delete note?")) {
                this.model.destroy();
                this.router.navigate("", {trigger: true, replace: true});
            }
        },

        saveNote: function () {
            this.model.set({
                name: this.$("#object_name").val().trim(),
                latitude: this.$("#latitude").val().trim(),
                longitude: this.$("#longitude").val().trim(),
                description: this.$("#comment").val().trim()
            });
        }
    });
}());
