// SRC: https://www.w3schools.com/php/php_ajax_php.asp
var url = 'http://localhost:5004/users/';
var arr = [];
var boxArr = [];
var obj = {
	showHint: function(str){
		console.log("in show hint", str);
		var search_res = document.getElementById("search_res");
		if (str.length == 0) {
	        console.log("RETURNING");
	        while(search_res.firstChild){
	        	search_res.removeChild(search_res.firstChild);
	        }
	        return;
	    } else {
	    	var hint = "";
	    	if (str !== "") {
		        while(search_res.firstChild){
		        	search_res.removeChild(search_res.firstChild);
		        }
			    var len=str.length;
			    arr.forEach((name) => {
			    	// console.log(name.substr(0, len).toUpperCase(), ' : ', str.toUpperCase());
			    	if(name[1].substr(0, len).toUpperCase() == str.toUpperCase()){
			    		search_res.appendChild(createBox(name));
			    	}
			    });
			}
	    }
	},
	setData: function(data){
		console.log("in set Data");
		arr = data.map(val => ([val.id, val.fname + ' ' + val.lname]));
		console.log(arr);
	}

}
function createBox(name){
	console.log("in createBox");
	var box = document.createElement("div");
	var span = document.createElement("span");
	var editBtn = document.createElement("a");
	var delForm = document.createElement("FORM");
	var delBtn = document.createElement("button");
	// Set box and span attributes
	box.className ="box";
	span.innerHTML = name[1];
	box.appendChild(span);
	// Set edit button attributes
	editBtn.className = "btn btn-warning";
	editBtn.innerText = "Edit";
	editBtn.href = "/admin/users/" + name[0] + "/edit";
	delForm.appendChild(editBtn);
	// Set delete form attributes
	delForm.action = "/admin/users/" + name[0] + "?_method=DELETE";
	delForm.method = "POST";
	delForm.className = "delete-form";

	// Set delete button attributes
	delBtn.className="btn btn-danger";
	delBtn.innerText="Delete";
	delForm.appendChild(delBtn);
	box.appendChild(delForm);
	return box;
}
function checkNames(name){

}


function parseJSON(res){
	// we need to parse our obj to json
	return res.json().then(function(parsedData){
		return parsedData.results[0]; // rather than having to ref data[0] everytime, we return the person's data
	}); 
}
function updateProfile(data){
	var fullname = data.name.first + ' ' + data.name.last;
	fullnameDisp.innerText = fullname;
	avatar.src = data.picture.medium;
	username.innerText = data.login.username;
	city.innerText = data.location.city;
	email.innerText = data.email;
}
function handleErrors(response){
	if(!response.ok){
			throw Error(response.status); // this will trigger the catch clause
		}
		return response; // return the non-errored response
}
function displayErrors(err){
	console.log(err);
}