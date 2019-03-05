
document.addEventListener('DOMContentLoaded', function() {
	setDropDown("/user/all", "emp_select");
	getGrantedAwards("/user/awards", null);
}, false);
function getGrantedAwards(url, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => showData(data))
	.catch(displayErrors);
}
function showData(data){
	console.log("in showData: ", data);
}
function updatePage(event){
	var ele_id = event.target.id;
	var addAwardForm  = document.getElementById("add_award");
	var showAwards    = document.getElementById("show_award");
	var editUserName  = document.getElementById("edit_username");
	console.log(event);
	if(ele_id === "a_grant_award"){
		addAwardForm.hidden = false;
		showAwards.hidden = true;
		editUserName.hidden = true;
	}else if(ele_id === "a_show_award"){
		showAwards.hidden = false;
		addAwardForm.hidden = true;
		editUserName.hidden = true;
	}
	else if(ele_id === "a_edit_username"){
		editUserName.hidden = false;
		addAwardForm.hidden = true;
		showAwards.hidden = true;
	}
}