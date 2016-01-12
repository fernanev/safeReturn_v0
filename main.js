window.onload = function() {

	var comments = window.localStorage.getItem('comments');
	
	document.getElementById('commentSection').innerHTML = comments;	
};

function sendComment() {
	var place = document.getElementById("commentPlace").value;
	var comment = document.getElementById("commentWhat").value;
	var date = new Date();
	
	if (!place) {
		alert('Please, you must introduce a place to send a comment.');
		return;
	} 
	if (!comment) {
		alert('Please, you must introduce some text to send a comment.');
		return;
	} 
	
	var dateString = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + "	" + date.getHours() + ":" + date.getMinutes();

	var commentSection = document.getElementById("commentSection");
	
	var newComment = "<div class = 'comment' name='" + place + "'> <div name = 'place'>"+place+"</div><div name ='date'>"+dateString+"</div><div name = 'comment'>"+comment+"</div>  </div>";
	
	commentSection.innerHTML = commentSection.innerHTML + newComment; 
	
	window.localStorage.setItem('comments', commentSection.innerHTML);
}

function searchComment() {
	var place = document.getElementById("searchAbout").value;
	var date = document.getElementById("searchDate").value;
	var commentSection = document.getElementById("commentSection");
	var searchSection = document.getElementById("searchSection");
	var dateComplete;
	document.getElementById('commentSection').innerHTML = window.localStorage.getItem('comments');

	if (!place) {
		alert('Please, you must introduce a place to search comments.');
	} else {
		var listd = commentSection.querySelectorAll('[name='+ place +']');
	
		if (!date) {
			searchSection.innerHTML = "";
			for (var i = 0; i < listd.length; i++) {
				searchSection.appendChild(listd[i]);
			}
			searchSection.style.visibility = 'visible';
			commentSection.style.visibility = 'hidden';
			commentSection.style.display = 'none';
		} else {
			searchSection.innerHTML = "";
			
			for (var i = 0; i < listd.length; i++) {
				
				dateComplete = listd[i].querySelector("[name='date']").innerHTML.split('/');
				date = date.split('-');
				alert(date);
				alert(dateComplete);
				
				if ((parseInt(date[2]) == parseInt(dateComplete[0])) && (parseInt(date[1]) == (1 + parseInt(dateComplete[1]))) && (parseInt(date[1]) == parseInt(dateComplete[2].split(" ")[0]))) {
					searchSection.appendChild(listd[i]);
				}
			}
			searchSection.style.visibility = 'visible';
			commentSection.style.visibility = 'hidden';
			commentSection.style.display = 'none';
		}
	}
}