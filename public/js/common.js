function setDropDown(url, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleDropDownData(data, ele))
	.catch(displayErrors);
}
function handleErrors(response){
	if(!response.ok){
		throw Error(response.status); // this will trigger the catch clause
	}
	return response; // return the non-errored response
}
// Parses our obj to function
function parseJSON(res){ 
	// Calling .json() gets you a promise for the body of the http response that is yet to be loaded.
	return res.json(); // promise return from this .then
}
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
function displayErrors(err){
	console.log(err);
}