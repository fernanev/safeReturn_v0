var map;

function initialize() {
	var parameters = window.location.search.split('=');
	var from = parameters[1].split('&')[0];
	var to = parameters[2].split('&')[0];
	
	window.localStorage.setItem('from',from);
	window.localStorage.setItem('to',to);	
	
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
          strokeColor: 'green'
        },
      }),
      directionsDisplay2: new goo.DirectionsRenderer({
        map: map,
        preserveViewport: true,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: 'blue'
        },
      }),
      directionsDisplay3: new goo.DirectionsRenderer({
        map: map,
        preserveViewport: true,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: 'red'
        },
      }),
	   directionsDisplay4: new goo.DirectionsRenderer({
        map: map,
        preserveViewport: true,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: 'orange'
        },
      }),
    },
	
    routeOne = {
      origin: from,
      destination: to, 
      travelMode: goo.TravelMode.WALKING
    },
    routeTwo = {
      origin: from,
      destination: to, 
      travelMode: goo.TravelMode.BICYCLING
    },
    routeThree = {
      origin: from,
      destination: to, 
      travelMode: goo.TravelMode.DRIVING
    },
	routeFour = {
      origin: from,
      destination: to, 
      travelMode: goo.TravelMode.TRANSIT
    };
    
 
  App.directionsService.route(routeOne, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      App.directionsDisplay1.setDirections(result);
      App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
    } else {
      // document.getElementById('status').innerHTML += "directionsDisplay1:" + status + "<br>";
    }
  });
 
  App.directionsService.route(routeTwo, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      App.directionsDisplay2.setDirections(result);
      App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
    } else {
      // document.getElementById('status').innerHTML += "directionsDisplay2:" + status + "<br>";
    }
  });
 
  App.directionsService.route(routeThree, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      App.directionsDisplay3.setDirections(result);
      App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
    } else {
      // document.getElementById('status').innerHTML += "directionsDisplay3:" + status + "<br>";
    }
  });
  
  App.directionsService.route(routeFour, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      App.directionsDisplay4.setDirections(result);
      App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
    } else {
      // document.getElementById('status').innerHTML += "directionsDisplay3:" + status + "<br>";
    }
  });
}
 
google.maps.event.addDomListener(window, 'load', initialize);

