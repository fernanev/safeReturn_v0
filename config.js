window.onload = function() {
	var currentUser = localStorage.getItem("currentUser").split('@@@');
	
	document.getElementById("usermail").value = currentUser[0];
	document.getElementById("name").value = currentUser[2];
	document.getElementById("labelUser").innerHTML = currentUser[3];
	document.getElementById("phonenumber").value = currentUser[4];
};

function changeInfo() {
	var users = localStorage.getItem("users").split('---');
	var currentUser = localStorage.getItem("currentUser");
	var currentUserChanged = currentUser.split('@@@');
	
	currentUserChanged[0] = document.getElementById("usermail").value; 
	currentUserChanged[2] = document.getElementById("name").value; 
	currentUserChanged[4] = document.getElementById("phonenumber").value; 
	
	if ((!!document.getElementById("newPassword").value || !!document.getElementById("reNewPassword").value) && (document.getElementById("newPassword").value != document.getElementById("reNewPassword").value) ) {
			alert('Both passwords must be the same');
	} else {
		if (currentUserChanged[1] == document.getElementById("currentPassword").value) {
			
			!!document.getElementById("newPassword").value ? currentUserChanged[1] = document.getElementById("newPassword").value : true; 
			
			for (var i = 0; i < users.length; i++) {
				if( users[i] == currentUser) {
					users[i] = currentUserChanged.join('@@@');
				}
				localStorage.setItem("users",users.join('---'));
				localStorage.setItem("currentUser",currentUserChanged.join('@@@'));
			}
			alert('user has been modified');
			document.getElementById("formChange").submit();
		} else {
			alert('Introduce the correct current password');
		}
	}	
}
