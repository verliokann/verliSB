App.Templates["template-notes-item"] =
    "<td class=\"note-name\">" +
    "  <div class=\"note-title note-view\"><%= name %></div>" +
    "</td>" +
    "<td class=\"note-action\">" +
    "  <div class=\"btn-group btn-group-sm pull-right\">" +
    "    <button class=\"btn btn-default note-edit\">" +
    "      <span class=\"glyphicon glyphicon-pencil\"></span>" +
    "    </button>" +
    "    <button class=\"btn btn-default note-delete\">" +
    "      <span class=\"glyphicon glyphicon-trash\"></span>" +
    "    </button>" +
    "  </div>" +
    "</td>";

App.Templates["template-note"] =
    "<div id=\"note-pane-edit\" class=\"pane\">" +
    "<form  id=\"note-form-edit\" role=\"form\" class=\"well form-horizontal\">\n" +
    "<fieldset>\n" +
    "\n" +
    "<!-- Text input-->\n" +
    "\n" +
    "<div class=\"form-group\">\n" +
    "  <label class=\"col-md-3 control-label\">Имя</label>  \n" +
    "  <div class=\"col-md-8 inputGroupContainer\">\n" +
    "  <div class=\"input-group\">\n" +
    "  <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "  <input id=\"object_name\" name=\"object_name\" placeholder=\"Name\" class=\"form-control\"   value=\"<%= name %>\" type=\"text\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Text input-->\n" +
    "      \n" +
    "<div class=\"form-group\"> \n" +
    "  <label class=\"col-md-3 control-label\">Широта</label>  \n" +
    "    <div class=\"col-md-8 inputGroupContainer\">\n" +
    "    <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-home\"></i></span>\n" +
    "  <input id=\"latitude\" name=\"latitude\" placeholder=\"Latitude\" class=\"form-control\" value=\"<%= latitude %>\" type=\"text\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Text input-->\n" +
    " \n" +
    "<div class=\"form-group\">\n" +
    "  <label class=\"col-md-3 control-label\">Долгота</label>  \n" +
    "    <div class=\"col-md-8 inputGroupContainer\">\n" +
    "    <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-home\"></i></span>\n" +
    "  <input id=\"longitude\" name=\"longitude\" placeholder=\"Longitude\" class=\"form-control\" value=\"<%= longitude %>\"  type=\"text\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Text area -->\n" +
    "  \n" +
    "<div class=\"form-group\">\n" +
    "  <label class=\"col-md-3 control-label\">Описание</label>\n" +
    "    <div class=\"col-md-8 inputGroupContainer\">\n" +
    "    <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-pencil\"></i></span>\n" +
    "        \t<textarea id=\"comment\" class=\"form-control\" name=\"comment\" rows=\"6\" placeholder=\"Object Description\"><%= description %></textarea>\n" +
    "  </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "</fieldset>\n" +
    "</form>\n" +
    "</div>" +
    // "    </div>" +

    "<script type=\"text/javascript\">" +
    "  $(document).ready(function() {\n" +
    "    $('#note-pane-edit').bootstrapValidator({\n" +
    "        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later\n" +
    "        feedbackIcons: {\n" +
    "            valid: 'glyphicon glyphicon-ok',\n" +
    "            invalid: 'glyphicon glyphicon-remove',\n" +
    "            validating: 'glyphicon glyphicon-refresh'\n" +
    "        },\n" +
    "        fields: {\n" +
    "           latitude: {\n" +
    "                validators: {\n" +
    "                    notEmpty: {\n" +
    "                        message: 'Please supply latitude'\n" +
    "                    },\n" +
    "                    between: {\n" +
    "                        min: -90,\n" +
    "                        max: 90,\n" +
    "                        message: 'The latitude must be between -90.0 and 90.0'\n" +
    "                    }\n" +
    "                }\n" +
    "            },\n" +
    "            longitude: {\n" +
    "                validators: {\n" +
    "                    notEmpty: {\n" +
    "                        message: 'Please supply longitude'\n" +
    "                    },\n" +
    "                    between: {\n" +
    "                        min: -180,\n" +
    "                        max: 180,\n" +
    "                        message: 'The longitude must be between -180.0 and 180.0'\n" +
    "                    }\n" +
    "                }\n" +
    "            },\n" +
    "   \n" +
    "            object_name: {\n" +
    "                validators: {\n" +
    "                        stringLength: {\n" +
    "                        min: 2,\n" +
    "                        message:'Please enter at least 2 characters'\n" +
    "                    },\n" +
    "                        notEmpty: {\n" +
    "                        message: 'Please supply your object name'\n" +
    "                    }\n" +
    "                }\n" +
    "            }\n" +
    "        }\n" +
    "            \n" +
    "        })\n" +
    "});\n" +
    "\n" +
    "</script>";

App.Templates["template-note-view"] =
    "<div class=\"well well-small\">" +
    "  <h2 id=\"pane-title\"><%= name %></h2>" +
    "</div>" +
    "<div id=\"pane-text\"><%= name %></div>";

