var FeatureSelected;
//cú pháp khởi tạo map
//setView([lat,lng]
var map = L.map('map').setView( [15.843222, 108.376083] , 14);
// khởi tạo tile map
/* var tilemap =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom:11,
    minZoom:5
}).addTo(map); */
var tilemap =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
    maxZoom:19,
    minZoom:0
});
//cách 2 add layer to map
map.addLayer(tilemap);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
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
marker.bindPopup('Tôi là điểm!');
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
    "<p>Lớp thứ nhất</p>": tilemap,
    '<p>Lớp thứ hai</p>' : OpenTopoMap
}

var Overlay = {
    "<p>Điểm</p>": marker,
    "<p>Hình tròn</p>" : circle,
    "<p>Vùng</p>" : polygon,
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



var wmsLayer = L.tileLayer.betterWms('http://localhost:8080/geoserver/thuadatquangnam/wms',
    {
        layers: 'thuadatquangnam:duynghia_quangnam',
        format: 'image/png',
        transparent: true,
        tiled: true
    }).addTo(map);
//add Basemap vào control có sẵn
Control.addBaseLayer(OpenTopoMap,'Base map 3');
//add layer vào control có sẵn    
Control.addOverlay(wmsLayer, "Thửa đất");

function showinfo(data){
    var feature = JSON.parse(data).features;

    if(FeatureSelected !==undefined){
        map.removeLayer(FeatureSelected);
    }
    
    FeatureSelected = L.geoJSON(feature, {
        style:{
            color:'red'
        }
    }).addTo(map);
    //xoa du lieu trong bang neu co
    var element = document.getElementById('result');
    element.innerHTML ='';
    //lay du lieu selected
    var dataselected = feature[0].properties;
    var table ='<table class="table table-hover header-fixed">';
    table += '<thead>';
    table += '<tr><th>Số tờ</th> <th>Số thửa</th> <th>Diện tích</th> <th>Tên chủ</th> <th>Mã SDĐ</th> </tr></thead>';
    table += '<tbody>';
    table += "<tr onclick = 'Panto("+dataselected.geom+")'>";
    table += '<td>'+dataselected.shbando+'</td>';
    table += '<td>'+dataselected.shthua+'</td>';
    table += '<td>'+dataselected.dientich+'</td>';
    table += '<td>'+dataselected.tenchusdd+'</td>';
    table += '<td>'+dataselected.mdsd+'</td>';
    table += '</tr>'
    table += '</tbody></table>';
    var resultdiv = $('#result');
    resultdiv.append(table);
}

function Search(){
    var soto = document.getElementById('txtsoto').value;
    var sothua = document.getElementById('txtsothua').value;
    var url = "xuly.php?soto="+soto+"&sothua="+sothua;
/*     console.log(url); */
    $.ajax({
        url :url, 
        type : "get", // chọn phương thức gửi là get
        dateType:"json", // dữ liệu trả về dạng json
        success : function (result){
            //convert text to json
            if(typeof result === 'string'){
                var Jsondata = JSON.parse(result);
                Showtable(Jsondata);
            }
            else{
                Showtable(result);
            }
            
           /*  console.log(Jsondata); */
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        } 
    })  
}

function Showtable(data){
    //xoa du lieu trong bang neu co
    var element = document.getElementById('result');
    element.innerHTML ='';
    
    var table ='<table class="table table-hover header-fixed">';
    table += '<thead>';
    table += '<tr><th>Số tờ</th> <th>Số thửa</th> <th>Diện tích</th> <th>Tên chủ</th> <th>Mã SDĐ</th> </tr></thead>';
    table += '<tbody>';
    for(var i = 0; i < data.length ; i++){
        table += "<tr onclick = 'Panto("+data[i].geom+")'>";
        table += '<td>'+data[i].shbando+'</td>';
        table += '<td>'+data[i].shthua+'</td>';
        table += '<td>'+data[i].dientich+'</td>';
        table += '<td>'+data[i].tenchusdd+'</td>';
        table += '<td>'+data[i].mdsd+'</td>';
        table += '</tr>'
    }

    table += '</tbody></table>';

    var resultdiv = $('#result');
    resultdiv.append(table);
    
}
function Panto(data){
    if(FeatureSelected !==undefined){
        map.removeLayer(FeatureSelected);
    }
    
    FeatureSelected = L.geoJSON(data, {
        style:{
            color:'red'
        }
    }).addTo(map);
    //GET bound of geojson layer
    var BoundLayer = FeatureSelected.getBounds();
    //zoom to layer
    /* map.fitBounds(BoundLayer); */
    var center = BoundLayer.getCenter();
    map.flyTo([center.lat,center.lng], 19);
    
    
}