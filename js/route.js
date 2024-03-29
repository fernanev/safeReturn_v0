var map;

function saveRoute() {
	window.open('http://fernanev.github.io/route.html#myModalSave', '_self',false);
	var to=localStorage.getItem('to').replace('%2C',', ').replace('+',' ');
	var from=localStorage.getItem('from').replace('%2C',', ').replace('+',' ');
	
	var routes = "" + from + "-" + to + "-" +  window.location.search.split('=')[1];
	var savedRoutes = window.localStorage.getItem('routes');
	if (savedRoutes == null) {
		savedRoutes = "";
	}
	routes = savedRoutes + "?" + routes;
	window.localStorage.setItem('routes', routes);
	
	//alert('Route Saved    ' + routes);
}

function callContact() {
	window.open('http://fernanev.github.io/route.html#myModalContact', '_self',false);
	var audio = new Audio('media/callRing.mp3');
	audio.play();
}

function callPolice() {
	window.open('http://fernanev.github.io/route.html#myModalPolice', '_self',false);
	var audio = new Audio('media/callRing.mp3');
	audio.play();
}

function initialize() {
	var from = localStorage.getItem('from');
	var to = localStorage.getItem('to');
	var route = window.location.search.split('=')[1];
	var color = 'green';
	
	switch( route) {
		 case "walking":
			color = 'green';
			routeOne = {
				  origin: from,
				  destination: to, 
				  travelMode: google.maps.TravelMode.WALKING		 
				};
			break;
		 case  "driving":
			color = 'red';
			routeOne = {
				  origin: from,
				  destination: to, 
				  travelMode: google.maps.TravelMode.DRIVING		 
				};
			break;

		case  "bicycling":
			color = 'blue';
			routeOne = {
				  origin: from,
				  destination: to, 
				  travelMode: google.maps.TravelMode.BICYCLING		 
				};
			break;
		case  "transit":
			color = 'orange';
			routeOne = {
				  origin: from,
				  destination: to, 
				  travelMode: google.maps.TravelMode.TRANSIT		 
				};
			break;
		default:
			routeOne = {
				  origin: from,
				  destination: to, 
				  travelMode: google.maps.TravelMode.WALKING		 
				};
				break;
	 }	 
	 
	
	wait = true;
    setTimeout("wait = true", 2000);
    var goo = google.maps,
    map = new goo.Map(document.getElementById('map-canvas'), {
      center: new goo.LatLng(43.614386, 7.071125),
      zoom: 2
    }),
	
	App = {
		map: map,
		bounds: new goo.LatLngBounds(),
		directionsService: new goo.DirectionsService(),
		directionsDisplay1: new goo.DirectionsRenderer({
			map: map,
			preserveViewport: true,
			suppressMarkers: true,
			polylineOptions: {
			  strokeColor: color
			},
		}),
	};
	
	App.directionsService.route(routeOne, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  App.directionsDisplay1.setDirections(result);
		  App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
		} else {
		  // document.getElementById('status').innerHTML += "directionsDisplay1:" + status + "<br>";
		}
	});
}
 
 
google.maps.event.addDomListener(window, 'load', initialize);

