var myMap;
var isUp = false;
var myGeoObject;
var myCollection;

ymaps.ready(function () {


    app.collection.on("change reset add remove", function () {
        this.drawAllPlacemarks();
    }, this);


    myMap = new ymaps.Map("first_map", {
        center: [56.321546, 43.988133],
        zoom: 10,
        controls: []
    });
    myCollection = new ymaps.GeoObjectCollection(null, {});

    addZoomControl(myMap);
    myMap.events.add('click', function (e) {
        $('#leftblock').slideDown(500);
        var coords = e.get('coords');
        console.log('user clicked on '+coords);
        //$("#object_latitude").text(coords);

        if (myGeoObject) {
            myGeoObject.geometry.setCoordinates(coords);
        } else {
            myGeoObject = createPlacemark(coords);
            myMap.geoObjects.add(myGeoObject);
            myGeoObject.events.add('dragend', function () {
                getAddress(myGeoObject.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });
    $('#leftblock').slideUp(0);
    $('#menu').slideUp(0);

    $('#list-virtual').click(function () {
        isUp = !isUp;
        drawAllPlacemarks();
        $('#menu').slideToggle("fast");
    });
});

function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
        iconCaption: 'поиск...'
    }, {
        preset: 'islands#blueDotIconWithCaption',
        draggable: true
    });
}

function getAddress(coords) {
    myGeoObject.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        obj_name= firstGeoObject.properties.get('name');
        obj_text = firstGeoObject.properties.get('text');
        myGeoObject.properties
            .set({
                iconCaption: obj_name,
              //  balloonContent: obj_text
            });
        $("#object_name").text(obj_name);
        $("#object_description").text(obj_text);
        var latitude = coords[0];
        latitude = latitude.toFixed(6);
        var longitude = coords[1];
        longitude = longitude.toFixed(6);
        $("#object_latitude").text(latitude +', '+ longitude);
    });
}

function drawAllPlacemarks() {
    removePlacemarks();
    if (myGeoObject) myMap.geoObjects.add(myGeoObject);
    if (isUp) {
        app.collection.each(function (obj) {
            var coords = [obj.get('latitude'), obj.get('longitude')];
            addPlacemark(coords);
        })
    }
}

function addPlacemark(coords, preset, iconColor, draggable, addindCollection) {
    if (!preset)preset = 'islands#circleDotIcon';
    if (!iconColor)iconColor = 'yellow';
    if (!draggable) draggable = false;
    if (addindCollection == undefined)addindCollection = true;

    var newObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [coords[0], coords[1]]
        }
    }, {
        preset: preset,
        iconColor: iconColor,
        draggable: draggable
    });
    if (addindCollection) myCollection.add(newObject);
    myMap.geoObjects.add(newObject);
    return newObject;
}

function removePlacemarks() {
    myMap.geoObjects.removeAll();
}

function viewPlacemark(coords) {
    $('#leftblock').slideDown(500);
    if (!myGeoObject) myGeoObject = createPlacemark(coords);
    myGeoObject.geometry.setCoordinates(coords);
    getAddress(coords);
    myMap.setCenter(coords, myMap.getZoom(), {
        duration: 500
    });

}

function addZoomControl(map) {
    ZoomLayout = ymaps.templateLayoutFactory.createClass("<div style='display: flex'>" +
        "<div id='zoom-in' class='btn' >" +
        "<span class=\"glyphicon glyphicon-plus\"></span>" +
        "</div><br>" +
        "<div id='zoom-out' class='btn' >" +
        "<span class=\"glyphicon glyphicon-minus\"></span>" +
        "</div>" +
        "</div>", {
        build: function () {
            ZoomLayout.superclass.build.call(this);

            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            $('#zoom-in').bind('click', this.zoomInCallback);
            $('#zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            $('#zoom-in').unbind('click', this.zoomInCallback);
            $('#zoom-out').unbind('click', this.zoomOutCallback);

            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() + 1
            });
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            this.events.fire('zoomchange', {
                oldZoom: map.getZoom(),
                newZoom: map.getZoom() - 1
            });
        }
    });
    zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    map.controls.add(zoomControl, {
        position: {
            left: $(window).width() / 2
        }
    });
}

function addVirtObjectToList() {
    var coords = myGeoObject.geometry.getCoordinates();
    var coll = app.collection;
    var obj_name = $('#object_name');
    var obj_description = $('#object_description');
    coll.create({name: obj_name.text(), longitude: coords[1], latitude: coords[0], description: obj_description.val()}, {
        success: function (colData, modelData) {
            coll.trigger("notes:add", coll.get(modelData.id));
        }
    });
}

function searchGeoObject() {
    var latitude = $('#latitude');
    var longitude = $('#longitude');
    var coords = [parseFloat(latitude.val()),
        parseFloat(longitude.val())];
    if (!myGeoObject) myGeoObject = createPlacemark(coords);
    myGeoObject.geometry.setCoordinates(coords);
    getAddress(coords);
    latitude.val('');
    longitude.val('');
    viewPlacemark(coords);
}





