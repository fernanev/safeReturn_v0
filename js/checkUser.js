
function userExist() {
	var userStorage = localStorage.getItem("users");
	var allUsers;
	var usersList;
	var error = true;
	
	!!userStorage ? allUsers = users + "---" + userStorage : allUsers = users;
	usersList = allUsers.split('---');
	
	for (var i = 0; i < usersList.length; i++) {
		var user = usersList[i].split('@@@');
		var userEmail = user[0];
		var password = user[1];

		if (userEmail == document.getElementById("usermail").value) {
			
			if (password == document.getElementById("password").value) {
				localStorage.setItem('users',allUsers);
				localStorage.setItem('currentUser',usersList[i]);
				window.open('http://fernanev.github.io/main.html', '_self',false);
				error = false;
			} 
		} 
		
	}
	if (error) {
		alert(' Wrong user or password ');
	}
}

function saveUser() {
	var users = localStorage.getItem("users");
	var initial = "---";
	var newUser;
	
	if (users == null) {
		users="";
		initial="";
	}
	newUser = document.getElementById("usermail").value + "@@@" + document.getElementById("password").value + "@@@" + document.getElementById("name").value;
	newUser += "@@@" + document.getElementById("username").value + "@@@" + document.getElementById("phonenumber").value
	users += initial + newUser
	
	localStorage.setItem('users',users);
	
	localStorage.setItem('currentUser',newUser);
}
function createUser(evt) {
	if (document.getElementById("password").value != document.getElementById("rePassword").value ) {
			alert('Both passwords must be the same');
	} else {
		saveUser();
		document.getElementById("signUp").submit();
	}
}

		

	

