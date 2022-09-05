//https://codepen.io/mahmoud-nb/pen/RZzNYr

//var mapboxUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var mapboxUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

/*fetch("./js/routes.json")
.then(response => {
   return response.json();
})
.then(data => console.log(data));*/


var map = L.map('map', {
   center: [51.518732, -0.105725],
   zoom: 7
   //zoomControl: true
}); 

L.tileLayer(mapboxUrl).addTo(map);

var control = L.Routing.control({
   "type": "LineString",
   waypoints: [
      L.latLng(11.062288325924548,-85.4156850899027),
      L.latLng(11.074395817466138,-85.63478670541367)
   ],
   language: 'es',
   /*
   "coordinates": [
      [52.5002237, -2.94],
      [52.5002237, -0.949],
      [52.5002237, -1.949]
   ],*/
   /*
   createMarker: (i, wp) => {
        return L.marker(wp.latLng, {
          icon: L.icon.glyph({ glyph: String.fromCharCode(65 + i) })
        });
      },*/
   lineOptions : {
      styles: [
         {color: 'black', opacity: 0.15, weight: 9}, 
         {color: 'white', opacity: 0.8, weight: 6}, 
         {color: 'red', opacity: 1, weight: 2}
      ],
      missingRouteStyles: [
         {color: 'black', opacity: 0.5, weight: 7},
         {color: 'white', opacity: 0.6, weight: 4},
         {color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12'}
      ]
   },

   show: true,
   addWaypoints: false,
   autoRoute: true,
   routeWhileDragging: false,
   draggableWaypoints: false,
   useZoomParameter: false,
   showAlternatives: true,
   //  geocoder: L.Control.Geocoder.nominatim(),
   /*
   routingstart: function(){
      console.log('routingstart')
   }*/
}).addTo(map)
.on('routingerror', function(e) {
		try {
			map.getCenter();
		} catch (e) {
			map.fitBounds(L.latLngBounds(waypoints));
		}
		handleError(e);
	});

L.Routing.errorControl(control).addTo(map);


//L.Routing.itinerary({
  // pointMarkerStyle:{radius: 5,color: '#03f',fillColor: 'white',opacity: 1,fillOpacity: 0.7},
   //show: true
//}).addTo(map);


/*$('#btn').on('click', function(){
   alert('btn');
   let newWaypoints = [
      L.latLng(11.062288325924548, -85.4156850899027),
      L.latLng(11.074395817466138, -85.63478670541367)
      ,L.latLng(51.75834, -0.127736)
   ];
   
   control.setWaypoints(newWaypoints);
});*/


$("#routeFrom").change(function(){

   var ruteSelected = $(this).children("option:selected").text();
   //var rutestring = ruteSelected.split('-')
   //var ruteReverted = revertRute(rutestring)

   let rute_a_coor=[11.113924783111838,-85.42193089881259,11.074395817466138,-85.63478670541367]
   let rute_b_coor=[11.062288325924548,-85.4156850899027,11.074395817466138,-85.63478670541367]
   let rute_c_coor=[10.899265589623786,-85.01831042138528,11.074395817466138,-85.63478670541367]
   let rute_d_coor=[11.113924783111838,-85.42193089881259,9.939120795131931, -84.08860361772723]
   let rute_e_coor=[11.082032801562312,-85.31110256918983,11.069518505247162, -85.36277222223625,11.074395817466138,-85.63478670541367]
   let route=[]

   
   if(ruteSelected==='Sta Elena - Sta Cecilia - La Cruz'){

      route=[L.latLng(rute_a_coor[0],rute_a_coor[1]),L.latLng(rute_a_coor[2],rute_a_coor[3])]

   }else if(ruteSelected==='Sta Cecilia - La Cruz') {

      route=[L.latLng(rute_b_coor[0],rute_b_coor[1]),L.latLng(rute_b_coor[2],rute_b_coor[3])]

   }else if(ruteSelected==='Upala - Sta Cecilia - La Cruz') {

      route=[L.latLng(rute_c_coor[0],rute_c_coor[1]),L.latLng(rute_c_coor[2],rute_c_coor[3])]

   }else if(ruteSelected==='Sta Cecilia - San Jose') {

      route=[L.latLng(rute_b_coor[0],rute_b_coor[1]),L.latLng(rute_a_coor[2],rute_a_coor[3]),L.latLng(rute_d_coor[2],rute_d_coor[3])]

   }else if(ruteSelected==='El Caoba - Sta Cecilia - La Cruz') {

      route=[L.latLng(rute_e_coor[0],rute_e_coor[1]),L.latLng(rute_e_coor[2],rute_e_coor[3]),L.latLng(rute_e_coor[4],rute_e_coor[5])]

   }else{
      alert("¡Ruta no encontrada!.")
   }

   let newWaypoints=[]
   for (let index = 0; index < route.length; index++) {
      newWaypoints.push(route[index]);
   }
   
   control.setWaypoints(newWaypoints);
   //consultRute(ruteSelected,false);
   //consultRute(ruteReverted,true);

});

  function createSVGRoutingMarker() {
    let primaryColor = '#FFDDCC';
    let strokeCoreColor = '#34FDCF';
    let strokeColor = '#333333';
    let selected = false
    let baseSize = 18;
    const centerStrokeWidth = 3 ;
    const colors = this.palette.colorForVan();
    const displayCross = null;

    const selectedAddon = selected ? ' stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="null" stroke-width="40" ' : '';

    const icon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="500">
              <path style="fill:#FFDDCC; fill-rule:evenodd" ${selectedAddon} d="M 295.78419,86.816926 L 295.78419,335.08252 L 687.71625,335.40310 C 664.71649,354.19396 650.35734,380.09418 650.54503,414.08813 L 261.47933,413.85667 C 257.75238,281.97351 70.642616,282.42223 66.576854,413.09434 C 38.473995,412.88466 34.575813,406.50199 34.304870,380.61469 L 34.304868,281.61469 C 33.952015,237.37253 28.426810,266.57731 61.177014,182.67997 C 94.875059,93.246445 85.585107,101.51291 116.06480,99.204795 L 295.78419,86.816926 z M 217.93865,233.19966 L 219.48981,127.72046 L 119.43969,133.92512 C 101.20003,135.14704 101.04823,135.26154 94.621050,156.41701 L 69.026832,224.66825 C 60.428592,245.60250 61.797130,251.77115 85.314062,248.71131 L 217.93865,233.19966 z M 966.63494,335.59074 L 966.82552,391.36792 L 902.21802,414.23783 L 845.49140,414.20156 C 845.72230,381.85903 832.28136,354.65711 808.44981,335.54893 L 966.63494,335.59074 z " />
              <rect x="335.82718" y="12.158683" height="301.70154" width="631.32404" style="fill:${strokeColor};" ${selectedAddon} />
              <circle r="77" cx="164" cy="412" style="fill:${strokeCoreColor};" ${selectedAddon} />
              <circle r="77" cx="748" cy="412" style="fill:${strokeCoreColor};" ${selectedAddon} />
            </svg>`;

    let url = "data:image/svg+xml;base64," + btoa(icon);
    return L.icon({
      iconUrl: url,
      iconSize: [baseSize * 2 , baseSize ],
      shadowSize: [12, 10],
      iconAnchor: [baseSize / 2, baseSize / 2],
      popupAnchor: [0, 0],
      className: "van-marker"
    });
  }

// http://www.liedman.net/leaflet-routing-machine/tutorials/
// DOC : http://www.liedman.net/leaflet-routing-machine/api/#l-routing-control