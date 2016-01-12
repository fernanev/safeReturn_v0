
function loadList() {
	var divSection = document.getElementById("routeList");
	var routeList = window.localStorage.getItem('routes');
	routeList = routeList.split('?');
	
	formu = document.createElement("form");
	formu.action = "route.html";
	formu.method = "get";
	formu.setAttribute("onsubmit", "event.preventDefault(); setParameters()");
	
	for (var i = 1; i < routeList.length; i++) {
		var rButton = document.createElement('input');
		var text = document.createElement('label');;
		rButton.setAttribute("type", "radio");
		rButton.setAttribute("required", true);
		rButton.setAttribute("name", "route");
		rButton.setAttribute("id", "route"+i);
		rButton.value = routeList[i].split('-')[2];
		text.innerHTML = "<label for='route"+i+"'>from: " + routeList[i].split('-')[0] + "   to: " + routeList[i].split('-')[1] + "</label>";
		formu.appendChild(rButton);
		formu.appendChild(text);
	}
	var button = document.createElement('input');
	button.setAttribute("type", "submit");
	formu.appendChild(button);
	divSection.appendChild(formu);
}

function setParameters() {
	var routeList = window.localStorage.getItem('routes').split('?');
	
	for (var i = 1; i < routeList.length; i++) {
		if (document.getElementById("route"+i).checked) {
			window.localStorage.setItem('from',routeList[i].split('-')[0]);
			window.localStorage.setItem('to',routeList[i].split('-')[1]);
			window.open('route.html?route=' + routeList[i].split('-')[2], '_self',false);			
		}
	}
}

function goBack() {
	history.back();
}

google.maps.event.addDomListener(window, 'load', loadList);

