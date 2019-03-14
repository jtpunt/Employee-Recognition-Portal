document.addEventListener('DOMContentLoaded', function() {
	fetch("/employees")
	.then(handleErrors)
	.then(parseJSON)
	.then(data => obj.setData(data))
	.catch(displayErrors);
}, false);
// SRC: https://www.w3schools.com/php/php_ajax_php.asp
var obj = {
	employees : [], // is filled with data from setData
	showHint: function(str){
		var search_res = document.getElementById("search_res");
		if (str.length == 0) { // is the search string empty?
	        while(search_res.firstChild){  // clear the search results
	        	search_res.removeChild(search_res.firstChild);
	        }
	        return;
	    } else {
	    	var hint = "";
	    	if (str !== "") { 
		        while(search_res.firstChild){ // clear the search results
		        	search_res.removeChild(search_res.firstChild);
		        }
			    var len=str.length;
			    employees.forEach((employee) => { // loop through each employee
			    	// compare the employees full name from index 0 to the length of the search string 
			    	// to the search string itself
			    	if(employee['fullname'].substr(0, len).toUpperCase() == str.toUpperCase()){
			    		// if there's a match, append a box to the search results containing
			    		// the employees name, a link to show awards that they have been granted, a link
			    		// to edit their accounts, and a button to delete that employee from the data base
			    		search_res.appendChild(createBox(employee));
			    	}
			    });
			}
	    }
	},
	// assigns data to the employees variable within this object 
	// and sets the employee drop down menu with data on the add user form
	setData: (data) => { handleDropDownData(employees = Array.from(data), "emp_select"); }
}
// Creates a div that has a nested span, 2 a tags, and a delete form and then returns this div.
// Where the span contains the name of the employee, the 1st a tag, takes you to a page showing 
// awards that the employee was granted, the 2nd a tag takes you to an edit page where you can 
// edit their regular user and/or admin user account.
// Sets the form to perform a delete request on the unique id of the employee
// Asks the admin in a popup dialog box if they're sure about deleting the employee, before deleting it
function createBox(employee){
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
	span.innerHTML = employee['fullname'];
	box.appendChild(span);

	// Set Show Awards button attributes
	showBtn.className = "btn btn-primary";
	showBtn.innerText = "Show Awards";
	showBtn.href = "/admin/users/" + employee['id'];
	delForm.appendChild(showBtn);

	// Set edit button attributes
	editBtn.className = "btn btn-warning";
	editBtn.innerText = "Edit";
	editBtn.href = "/admin/users/" + employee['id'] + "/edit";
	delForm.appendChild(editBtn);

	// Set delete form attributes
	delForm.action = "/admin/users/" + employee['id'] + "?_method=DELETE";
	delForm.method = "POST";
	delForm.className = "delete-form";
	delForm.addEventListener("submit", function(event){
		event.preventDefault();
		if (confirm("Are you sure you want to delete this award?")) {
    		fetch("/admin/users/" + employee['id'], { method: 'delete'})
			.then(handleErrors)
			.then(response => handleDelete(box, "User Successfully Deleted!"))
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


