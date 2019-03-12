document.addEventListener('DOMContentLoaded', function() {
	setDropDown("/employees", "emp_select");
}, false);

function getGrantedAwards(url, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleData(data))
	.catch(displayErrors);
}
function getCurrentUser(url){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => setUserForm(data))
	.catch(displayErrors);
}
function handleData(awardData){
	var show_award  = document.getElementById("show_award");
	console.log("in handleData: ", awardData);
	awardData.forEach(function(award){
		show_award.appendChild(createBox(award));
	});
}
function setUserForm(data){
	console.log(data);
	var editUserName  = document.getElementById("edit_username"); // div
	var h1 = document.getElementById("usernameH1"); // h1
	var usernameForm = document.getElementById("usernameForm"); // form
	var username     = document.getElementById("username"); // input
	usernameForm.action = "/user/" + data['id'] + "?_method=PUT";
	h1.innerHTML = "Edit " + data['username'];
	username.value = data['username'];
}
function updatePage(event){
	var ele_id = event.target.id;
	var addAwardForm  = document.getElementById("add_award");
	var showAwards    = document.getElementById("show_award");
	var editUserName  = document.getElementById("edit_username");
   	while(showAwards.firstChild){
    	showAwards.removeChild(showAwards.firstChild);
    }
	console.log(event);
	if(ele_id === "a_grant_award"){
		addAwardForm.hidden = false;
		showAwards.hidden = true;
		editUserName.hidden = true;
	}else if(ele_id === "a_show_award"){
		getGrantedAwards("/user/awards", null);
		showAwards.hidden = false;
		addAwardForm.hidden = true;
		editUserName.hidden = true;
	}
	else if(ele_id === "a_edit_username"){
		getCurrentUser("/user/currentUser");
		editUserName.hidden = false;
		addAwardForm.hidden = true;
		showAwards.hidden = true;
	}
}
function createBox(award){
	console.log("in createBox w:", award);

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