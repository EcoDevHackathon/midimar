$("#coor_k").val(Math.random() + 12);
$("#coor_B").val(Math.random() + 107);
var mapOptions = {
    center: new google.maps.LatLng(-1.944698, 30.089638),
    zoom: 8
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var panorama = map.getStreetView();
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var socket = io();
var coordinate = '';
var socket_id = '';
var time = '';
var allFlightPath = [];
var allMarkerStress = [];
var streetLineStatus = 0;
var markers = [];
var position_from = [],
    infowindow = [];
serverUserTime = 0;
createGroup = 0;
room_id = '';
//Lấy những người dùng đã đăng nhập trước
function getServerUser() {
    socket.on("server_user", function(server_user) {
        if (serverUserTime == 0) {
            for (var i = 0; i < server_user.length; i++) {
                data_user = server_user[i];
                makeMarkerUser(data_user, server_user[i].id);
            }
            serverUserTime = 1;
        }
    });
}
//Tạo marker 
function makeMarkerUser(data_user, id) {
    if (data_user.sex == "male") {
        var icon_user = "http://icons.iconarchive.com/icons/hopstarter/face-avatars/24/Male-Face-D4-icon.png";
    } else {
        var icon_user = "http://icons.iconarchive.com/icons/hopstarter/face-avatars/24/Female-Face-FC-2-icon.png";
    }
    markers[id] = new google.maps.Marker({
        position: new google.maps.LatLng(data_user.coordinate[0], data_user.coordinate[1]),
        icon: icon_user
    });
    markers[id].setMap(map);
    markers[id].id = data_user.id;

    infowindow[id] = new google.maps.InfoWindow();
    infowindow[id].setContent("<b>" + data_user.name + "</b>");
    infowindow[id].open(map, markers[id]);

    google.maps.event.addListener(markers[id], 'dblclick', function(marker, id) {
        if (createGroup == 0) {
            alert("Please create group");
        } else {

            if (data_user.id != socket_id) {
                socket.emit("invite_room", data_user.id, room_id);
                alert("Sent invite message");
            } else {
                alert("You can't invite yourself");
            }

        }
    });
}

$(function() {

    getServerUser();

    google.maps.event.addListener(map, 'dblclick', function(event) {
        if (room_id != '') {
            socket.emit("event_room", room_id, "travel", [event.latLng.lat(), event.latLng.lng()]);
        } else {
            position_from = [coordinate];
            position_to = [event.latLng.lat(), event.latLng.lng()];
            travel(position_from, position_to);
        }
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        if (room_id != '') {
            var mapview = {};
            center = {
                "lat": map.center.k,
                "lng": map.center.B
            }
            mapview.zoom = map.zoom;
            mapview.center = center;
            socket.emit("event_room", room_id, "bounds", mapview);
        }
    });
    google.maps.event.addListener(panorama, 'visible_changed', function() {
        streetview = {};
        if (panorama.getVisible()) {
            streetview.show = 1;
            streetview.getPano = panorama.getPano();
            streetview.getPov = panorama.getPov();
            streetview.getPosition = panorama.getPosition();
            streetview.getZoom = panorama.getZoom();
        } else {
            streetview.show = 0;
        }
        socket.emit("event_room", room_id, "streetview", streetview);
    });

    function streetview_changed(panorama) {
        streetview = {};
        streetview.show = 1;
        streetview.getPano = panorama.getPano();
        streetview.getPov = panorama.getPov();
        streetview.getPosition = panorama.getPosition();
        streetview.getZoom = panorama.getZoom();
        socket.emit("event_room", room_id, "streetview", streetview);
    }
    google.maps.event.addListener(panorama, 'position_changed', function() {
        streetview_changed(panorama);
    });
    google.maps.event.addListener(panorama, 'pov_changed', function() {
        streetview_changed(panorama);
    });
    google.maps.event.addListener(panorama, 'zoom_changed', function() {
        streetview_changed(panorama);
    });



});

function travel(from, to) {
    for (var i = 0; i < Math.max(allFlightPath.length, allMarkerStress.length); i++) {
        if (typeof(allFlightPath[i]) !== undefined) {
            allFlightPath[i].setMap(null);
        }
        if (typeof(allMarkerStress[i]) !== undefined) {
            allMarkerStress[i].setMap(null);
        }
    }
    allFlightPath = [];
    allMarkerStress = [];
    for (var i = 0; i < from.length; i++) {
        var request = {
            origin: new google.maps.LatLng(from[i][0], from[i][1]),
            destination: new google.maps.LatLng(to[0], to[1]), //lat, lng
            travelMode: google.maps.TravelMode["WALKING"]
        };
        directionsService.route(request, function(response, status) {
            var flightPath = '',
                marker_stress = '';
            if (status == google.maps.DirectionsStatus.OK) {
                data = response.routes[0].overview_path;
                color = "#ff0000";
                opacity = 1;

                flightPath = new google.maps.Polyline({
                    path: data,
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: opacity,
                    strokeWeight: 2,
                    map: map
                });
                flightPath.setMap(map);
                marker_stress = new google.maps.Marker({
                    position: new google.maps.LatLng(data[data.length - 1].k, data[data.length - 1].B),
                    icon: "http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/hand-point-270-icon.png"
                });
                marker_stress.setMap(map);
                allFlightPath.push(flightPath);
                allMarkerStress.push(marker_stress);
            }
        });
    }
}