// SRC: https://www.w3schools.com/php/php_ajax_php.asp
var url = 'http://localhost:5004/users/';
var arr = [];
var boxArr = [];
var obj = {
	showHint: function(str){
		console.log("in show hint", str);
		var search_res = document.getElementById("search_res");
		if (str.length == 0) {
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
		console.log("in set Data", data);
		arr = data.map(val => ([val.id, val.fname + ' ' + val.lname]));
		console.log(arr);
		document.addEventListener('DOMContentLoaded', function() {
			handleDropDownData(arr, "emp_select");
		});
	}

}
function createBox(name){
	console.log("in createBox");
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	var deptpiechart = document.getElementById("deptpiechart");
	var locpiechart = document.getElementById("locpiechart");
	var addUser = document.getElementById("addUser");
	var search = document.getElementById("search");
	var search_res = document.getElementById("search_res");
	var editUserBtn = document.getElementById("editUser");

	var box = document.createElement("div");
	var span = document.createElement("span");
	var showBtn = document.createElement("a");
	var editBtn = document.createElement("a");
	var delForm = document.createElement("FORM");
	var delBtn = document.createElement("button");
	                     
	// Set box and span attributes
	box.className ="mybox";
	span.innerHTML = name[1];
	box.appendChild(span);

	// Set Show Awards button attributes
	showBtn.className = "btn btn-primary";
	showBtn.innerText = "Show Awards";
	showBtn.href = "/admin/users/" + name[0];
	delForm.appendChild(showBtn);

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


