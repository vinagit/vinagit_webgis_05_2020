//cú pháp khởi tạo map
//setView([lat,lng]
var map = L.map('map').setView( [10.747555, 106.736077] , 7);
// khởi tạo tile map
/* var tilemap =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom:11,
    minZoom:5
}).addTo(map); */
var tilemap =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom:17,
    minZoom:0
});
//cách 2 add layer to map
map.addLayer(tilemap);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	minZoom:0
});

map.addLayer(OpenTopoMap);
//Remove layer from map
/* map.removeLayer('layer name') */

//add điểm
var marker = L.marker([10.747555, 106.736077]);
map.addLayer(marker);

//add circle
var circle = L.circle([10.741555, 106.734077], {
    color: 'green',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
});
map.addLayer(circle);

//add polygon
var polygon = L.polygon([
    [10.711555, 106.714077],
    [10.741555, 106.734077],
    [10.791555, 106.794077]
]);
map.addLayer(polygon);

//popups
marker.bindPopup('Tôi là điểm!').openPopup();
circle.bindPopup('Tôi là hình tròn!');
polygon.bindPopup('Tôi là vùng!');


//tạo layer control
//basemap là group tập hợp các tile map
//overlayMaps là group tập hợp các layer khác (không phải bản đồ nền)
/* B1: tạo layer group */
var BaseMapGroup =  L.layerGroup([tilemap, OpenTopoMap]);
var OverlayLayers = L.layerGroup([marker,circle,polygon]);
/* B2: add các group vào control */

/* var ObjectBase = {
    name: 'nguyen van a'
};
ObjectBase.name */
var base = {
    "Lớp thứ nhất": tilemap,
    'Lớp thứ hai' : OpenTopoMap
}

var Overlay = {
    "Điểm": marker,
    "Hình tròn" : circle,
    "Vùng" : polygon
}

var Control = L.control.layers(base, Overlay, {collapsed:false} );
map.addControl(Control);

//GeoJson
var geojson = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [106.714077,10.711555]
    }
};
var geojsonLayer =  L.geoJSON(geojson);
map.addLayer(geojsonLayer);

var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

var lineGeojson = L.geoJSON(myLines);
map.addLayer(lineGeojson);

var geojsonpolygon = {
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}
var geosjonPolygon = L.geoJSON(geojsonpolygon, 
    {
        style:{
            color: 'red',
            fillColor:'blue',
            fillOpacity:0.8	
        }
    }    
).on('mouseover', function(e){
    //do something
    geosjonPolygon.setStyle({fillColor:'#fff'});
}).on('mouseout', function(e){
    //do something
    geosjonPolygon.setStyle({fillColor:'blue'});
}).addTo(map);