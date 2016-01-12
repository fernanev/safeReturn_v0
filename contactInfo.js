window.onload = function() {
	var contact = localStorage.getItem("contactInfo");
	
	if (!contact) {
		contact = defaultContact;
	}
	
	document.getElementById("name").value = contact.split('@@@')[0];
	document.getElementById("phonenumber").value = contact.split('@@@')[1];
	document.getElementById("usermail").value = contact.split('@@@')[2];
};

function changeContactInfo() {
	var contact = localStorage.getItem("contactInfo");

	if (!contact) {
		contact = defaultContact;
	}
	
	contact = contact.split('@@@');
	contact[0] = document.getElementById("name").value; 
	contact[1] = document.getElementById("phonenumber").value; 
	contact[2] = document.getElementById("usermail").value; 
	
	localStorage.setItem("contactInfo",contact.join('@@@'));
			
	alert('contact has been modified');
	document.getElementById("contactInfoForm").submit();	
}