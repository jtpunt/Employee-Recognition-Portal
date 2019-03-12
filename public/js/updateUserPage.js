document.addEventListener('DOMContentLoaded', function() {
	setDropDown("/employees", "emp_select");
}, false);
// Gets awards granted by the currently logged in user
function getGrantedAwards(url){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleAwards(data))
	.catch(displayErrors);
}
// Gets the username and id of the currently logged in user
function getCurrentUser(url){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => setUserForm(data)) 
	.catch(displayErrors);
}
// Displays on-screen the awards granted by the currently logged in user
function handleAwards(awardData){
	var show_award  = document.getElementById("show_award");
	console.log("in handleData: ", awardData);
	awardData.forEach(function(award){
		show_award.appendChild(createBox(award));
	});
}
// Fills the user edit form with their current username
// Sets the form to perform a put request on their unique id so that their username may be updated
function setUserForm(userData){
	console.log(data);
	var editUserName  = document.getElementById("edit_username"); // div
	var h1 = document.getElementById("usernameH1"); // h1
	var usernameForm = document.getElementById("usernameForm"); // form
	var username     = document.getElementById("username"); // input
	usernameForm.action = "/user/" + userData['id'] + "?_method=PUT";
	h1.innerHTML = "Edit " + userData['username'];
	username.value = userData['username'];
}
// Handles the on-click events from the a tags on the left-side of the user dashboard by showing
// specific content associated with those a tags on the right-side of he user dashboard.
function updatePage(event){
	var ele_id = event.target.id;
	var addAwardForm  = document.getElementById("add_award");
	var showAwards    = document.getElementById("show_award");
	var editUserName  = document.getElementById("edit_username");
   	while(showAwards.firstChild){
    	showAwards.removeChild(showAwards.firstChild);
    }
	if(ele_id === "a_grant_award"){ // Does the user want to grant an award?
		addAwardForm.hidden = false; // Show the add award form, hide the other content
		showAwards.hidden = true;
		editUserName.hidden = true;
	}else if(ele_id === "a_show_award"){ // Does the user want to show awards they've granted?
		getGrantedAwards("/user/awards"); // Gets awards granted by the user, prepare them to be displayed on-screen
		showAwards.hidden = false; // Show the awards that the user has granted, hide the other content
		addAwardForm.hidden = true;
		editUserName.hidden = true;
	}
	else if(ele_id === "a_edit_username"){ // Does the user want to edit their username?
		getCurrentUser("/user/currentUser"); // Get the current username and id, then preset the user edit form with this data
		editUserName.hidden = false; // Show the user edit form, hide the other content
		addAwardForm.hidden = true;
		showAwards.hidden = true;
	}
}
// Creates a div that has a nested span and a delete form
// Where the span contains the name of the award recipient, and the name of the award they receieved
// Sets the form to perform a delete request on the unique id of the granted award
// Asks the user in a popup dialog box if they're sure about deleting the granted award, before deleting it
function createBox(award){
	var box = document.createElement("div");
	var span = document.createElement("span");
	var editBtn = document.createElement("a");
	var delForm = document.createElement("FORM");
	var delBtn = document.createElement("button");
	                     
	// Set box and span attributes
	box.className ="mybox";
	span.innerHTML = award['award_recipient'] + ' - ' + award['title'];
	box.appendChild(span);

	// Set delete form attributes
	delForm.action = "/user/awards/" + award['id'] + "?_method=DELETE";
	delForm.method = "POST";
	delForm.className = "delete-form";
	delForm.addEventListener("submit", function(event){
		event.preventDefault();
		if (confirm("Are you sure you want to delete this award?")) {
    		fetch("/user/awards/" + award['id'], { method: 'delete'})
			.then(handleErrors)
			.then(response => handleDelete(box, "Award Successfully Deleted!"))
			.catch(displayErrors)
  		} else {
  		}
	});
	// Set delete button attributes
	delBtn.className="btn btn-danger";
	delBtn.innerText="Delete";
	delForm.appendChild(delBtn);
	box.appendChild(delForm);
	return box;
}