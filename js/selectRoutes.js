
function loadList() {
	var divSection = document.getElementById("routeList");
	var routeList = window.localStorage.getItem('routes');
	routeList = routeList.split('?');
	
	var formu = document.createElement("form");
	formu.action = "route.html";
	formu.method = "get";
	formu.setAttribute("onsubmit", "event.preventDefault(); setParameters()");
	
	var table = document.createElement("table");
	var row ;
	var column1;
	var column2;
	
	for (var i = 1; i < routeList.length; i++) {
		row = document.createElement("tr");
		column1 = document.createElement("td");
	    column2 = document.createElement("td");
		var rButton = document.createElement('input');
		var text = document.createElement('label');;
		rButton.setAttribute("type", "radio");
		rButton.setAttribute("required", true);
		rButton.setAttribute("name", "route");
		rButton.setAttribute("id", "route"+i);
		rButton.value = routeList[i].split('-')[2];
		text.innerHTML = "<label for='route"+i+"'><b>from:</b> " + routeList[i].split('-')[0] + "   <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to:</b> " + routeList[i].split('-')[1] + "</label>";
		column1.appendChild(rButton);
		column2.appendChild(text);
		row.appendChild(column1);
		row.appendChild(column2);
		table.appendChild(row);
	}
	var button = document.createElement('input');
	button.setAttribute("type", "submit");
	button.setAttribute("class", "buttonClass");
	formu.appendChild(table);
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

