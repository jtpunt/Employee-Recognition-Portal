document.addEventListener('DOMContentLoaded', function() {
	var btns = document.getElementsByClassName("mybtn"); 
	// Because you cannot iterate through a NodeList, we must invoke the 
	// Array.prototype.forEach method, and use call to set btns as the context
	Array.prototype.forEach.call(btns, function(btn){
		btn.addEventListener("click", function() {
		    var current = document.getElementsByClassName("active");
		    if(current[0] !== undefined){ // is there a btn that's already "active" or highlighted?
		    	// remove the classname "active"
		    	current[0].className = current[0].className.replace(" active", ""); 
		    }
		    this.className += " active"; // add the "active" classname to the btn that was just clicked
		});
	});
}, false);
// Function helper for populating a drop down menu with data
function setDropDown(url, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleDropDownData(data, ele))
	.catch(displayErrors);
}
// Function helper to handle the deletion of awards or employees.
// After deletion, the bootstrap alert-success box is targeted
// and a message to the user is shown on screen for a brief couple of seconds
// before the alert-success box fades away.
function handleDelete(ele, msg){
	var successAlert = document.getElementById("alert-success");
	console.log(successAlert);
	ele.parentNode.removeChild(ele); // delete the award entry
	successAlert.firstChild.innerHTML = msg;
	successAlert.firstChild.style.display = "block";
	setTimeout(function(){ 
		$("#alert-success").fadeOut('slow');
	}, 2000);
	successAlert.removeAttribute("style"); // remove the styling so that the alert box will show up again
}
// Function helper to handle any errors from fetch calls
function handleErrors(response){
	if(!response.ok){
		throw Error(response.status); // this will trigger the catch clause
	}
	return response; // return the non-errored response
}
// Function helper for fetch calls to handle parsing our obj to JSON 
function parseJSON(res){ 
	// Calling .json() gets you a promise for the body of the http response that is yet to be loaded.
	return res.json(); // promise return from this .then
}
// Function helper to handle setting the drop-down menus with Dept/Loc or Employee Name/id data
function handleDropDownData(data, ele){
	console.log("in handleDropDown w/: ", data);
	var dropDownList = document.getElementById(ele);
	data.forEach(function(myData){
		var option = document.createElement("option");
		if(myData.category){ // Dept/Loc Data
			option.textContent = myData['category'];
			option.value = myData['id'];
		}else{ // Employee Name/id data
			option.textContent = myData['fullname']; // Employee Name
			option.value = myData['id']; // Employee Id
		}
		dropDownList.appendChild(option);
	});
}
// Function help for fetch calls to handle displaying any errors
function displayErrors(err){
	console.log(err);
}