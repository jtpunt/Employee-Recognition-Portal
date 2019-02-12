// SRC: https://www.w3schools.com/php/php_ajax_php.asp
var url = 'http://localhost:5004/users/';
var arr = [];
var obj = {
	showHint: function(str){
		if (str.length == 0) {
	        document.getElementById("txtHint").innerHTML = "";
	        return;
	    } else {
	    	var hint = "";
	    	if (str !== "") {
			    var len=str.length;
			    arr.forEach((name) => {
			    	// console.log(name.substr(0, len).toUpperCase(), ' : ', str.toUpperCase());
			    	if(name.substr(0, len).toUpperCase() == str.toUpperCase()){
			    		console.log(name);
			    		document.getElementById("txtHint").innerHTML = name;
			    	}
			    });
			}
	    }
	},
	setData: function(data){
		console.log("in set Data");
		console.log(data);
		arr = data.map(val => (val.fname + ' ' + val.lname));
		console.log(arr);
	}

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