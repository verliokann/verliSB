<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Yandex Map with marking Icons</title>
    <script src="resources/js/jquery-3.2.1.js" type="text/javascript"></script>
    <script src="resources/js/underscore.js" type="text/javascript"></script>
    <script src="resources/js/backbone.js" type="text/javascript"></script>

    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
            type="text/javascript"></script>
    <script src="resources/app_mapnotebook/map/map.js" type="text/javascript"></script>

    <link href="resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <script src="resources/js/bootstrap.min.js"></script>
    <link href="resources/app_mapnotebook/map/main.css" rel="stylesheet" media="screen">

    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
    <link rel="stylesheet" href="resources/css/bootstrap-theme.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.4.0/showdown.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.5.3/js/bootstrapValidator.js"
            type="text/javascript"></script>


    <script src="resources/js/backbone.localStorage-min.js" type="text/javascript"></script>

    <link rel="stylesheet" href="resources/app_mapnotebook/virtual/app.css">
    <script src="resources/app_mapnotebook/virtual/js/namespace.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/config.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/virtual.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/virtuals.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/templates/templates.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/views/note.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/views/notes-item.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/views/notes-filter.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/views/virtuals.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/routers/router.js"></script>
    <script src="resources/app_mapnotebook/virtual/js/app.js"></script>
</head>
<body>
<div class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Yandex Map</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li>
                    <form id="coordinates" class="navbar-form form-inline">
                        <div class="form-group">
                            <input id="latitude" type="text" placeholder="Широта.." size="10"
                                   class="input-mini form-control">
                            <input id="longitude" type="text" placeholder="Долгота.." size="10"
                                   class="input-mini form-control">
                        </div>
                        <button type="button" onclick="searchGeoObject()" class="btn btn-default">
                            <span class="glyphicon glyphicon-search"></span> Поиск
                        </button>
                    </form>
                </li>
                <li><a id="list-virtual"><span class="glyphicon glyphicon-heart"></span></a></li>

            </ul>
            <form class="nav navbar-nav navbar-right navbar-form-nonresp navbar-search region region-notes"
                  role="search" style="display: none;">
                <div class="form-group">
                    <input type="text" class="search-query form-control"
                           placeholder="Фильтр...">
                </div>
            </form>
            <form class="navbar-form form-inline navbar-right">
                <a class="btn btn-default" href="mapreport"><span class="glyphicon glyphicon-save"></span>
                    Отчет</a>
            </form>
        </div>
    </div>
</div>


<div id="left_decription" class="container_custom">
    <div class="row">
        <div class="col-md-3" style="z-index: 100; margin-top: 10px;">
            <div id="leftblock" class="panel panel-default" style="display: none;">
                <div class="panel-heading">
                    <h3 id="object_name" class="panel-title">Наименование объекта</h3>
                </div>
                <div class="panel-body">
                    <button onclick="addVirtObjectToList()" type="button"
                            class="btn btn-default btn-sm pull-right">
                        <span class="glyphicon glyphicon-heart"></span>
                    </button>
                    Координаты
                    <form role="form" class="form-inline">
                        <div class="form-group">
                            <label id="object_latitude" for="latitude"></label>
                        </div>
                    </form>

                    <textarea id="object_description" class="form-control" placeholder="Описание..."></textarea>

                </div>
            </div>
        </div>

        <div id="menu" class="col-md-3 col-md-offset-6"
             style="display: none; background-color: #f8f8f8; height: 300px; overflow: auto; z-index: 100; margin-top: 10px;">
            <div id="notes" class="region region-notes">
                <table id="notes-list" class="table table-curved table-hover">
                    <tbody>
                    <tr>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="first_map" style="width:100%; height:100%; z-index: 1"></div>
    </div>
</div>
<div id="myNode" class="modal fade region region-note ms-auto" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">×</button>
                <h4 id="head_name" class="modal-title">Редактировать метку</h4>
            </div>
            <div id="note" class="region region-note" style="display: none;"></div>
            <div class="modal-footer">
                <button class="btn btn-default" type="button" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>
