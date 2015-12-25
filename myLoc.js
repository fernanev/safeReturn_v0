//myLoc.js
window.onload = getMyLocation;
//Note that map has been globally declared.
var map;
var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;

// Obtain the current location.
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert('Oops, no geolocation support');
  }
}

//This function is invoked asynchronously by the HTML5 geolocation API.
function displayLocation(position) {
  //The latitude and longitude values obtained from HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  //Creating a new object for using latitude and longitude values with Google map.
  var latLng = new google.maps.LatLng(latitude, longitude);
  
  showMap(latLng);

  //Also setting the latitude and longitude values in another div.
  
  //var div = document.getElementById('location');
  //div.innerHTML = 'You are at Latitude: ' + latitude + 'º, Longitude: ' + longitude+'º ';

  //autoFillAddress(latLng);
}

//Filled address into input form
function autoFillAddress(latLng) {
  // obtaining autofilled form
  geocoder.geocode({'location': latLng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(16);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
		google.maps.event.addListener(marker, 'click', function() {infowindow.open(map);});
					
		var index;

		for (index = 0, len = results[0].address_components.length; index < len; ++index) {
			switch (results[0].address_components[index].types[0]) {
				case "route":
					document.getElementById('street').value = results[0].address_components[index].long_name;
				break;				
				case "locality":
					document.getElementById('city').value = results[0].address_components[index].long_name;
				break;
				case "country":
					document.getElementById('country').value = results[0].address_components[index].long_name;
				break;
				case "postal_code":
					document.getElementById('zipCode').value = results[0].address_components[index].long_name;
				break;
				default:
				break;
			}
		}	
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
 
   document.getElementById('submitAddress').addEventListener('click', function() {
     geocodeAddress(geocoder, map);
   });  
}


// update address
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('street').value + ", " + document.getElementById('zipCode').value 
				+ " " + document.getElementById('city').value + ", " + document.getElementById('country').value;
  
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
		
		var div = document.getElementById('location');
		div.innerHTML = 'You are at Latitude: ' + results[0].geometry.location.lat() + ', Longitude: ' + results[0].geometry.location.lng();
		
		var latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
		autoFillAddress(latLng);
		
	  map.setZoom(16);
       var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map
       });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
		google.maps.event.addListener(marker, 'click', function() {	infowindow.open(map,marker);});  
		map.setCenter(results[0].geometry.location);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function showMap(latLng) {
  //Setting up the map options like zoom level, map type.
  var mapOptions = {
    center: latLng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Creating the Map instance and assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
