document.addEventListener('DOMContentLoaded', function() {
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	setChart("/admin/departments", "departments", "Departments", "deptpiechart");
	setChart("/admin/locations", "locations", "Locations", "locpiechart");
	setDropdown("/admin/departments/all", "dept_select");
	setDropdown("/admin/locations/all", "loc_select");
	dept_select.addEventListener("change", function(){
		if(this.value === "all")
			setChart("/admin/departments", "departments", "Departments", "deptpiechart");
		else
			setChart("/admin/departments/" + this.value, "", "", "deptpiechart");
	});
	loc_select.addEventListener("change", function(){
		if(this.value === "all")
			setChart("/admin/locations", "locations", "Locations", "locpiechart");
		else
			setChart("/admin/locations/" + this.value, "", "", "locpiechart");
	})
}, false);
function setChart(url, category, title, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleChartData(data, category, title, ele))
	.catch(displayErrors);
}
function setDropdown(url, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleDropDownData(data, ele))
	.catch(displayErrors);
}
// Parses our obj to function
function parseJSON(res){ 
	// Calling .json() gets you a promise for the body of the http response that is yet to be loaded.
	return res.json(); // promise return from this .then
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
function handleChartData(data, category, title, ele){
    drawPieChart(data, category, title, ele);
    window.addEventListener("resize", () => drawPieChart(data, category, title, ele));
}
function handleDropDownData(data, ele){
	var dropDownList = document.getElementById(ele);
	data.forEach(function(myData){
		var option = document.createElement("option");
		option.textContent = myData.category;
		option.value = myData.id;
		dropDownList.appendChild(option);
	});
}
function updatePage(event){
	var ele_id = event.target.id;
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	var deptpiechart = document.getElementById("deptpiechart");
	var locpiechart = document.getElementById("locpiechart");
	var addUser = document.getElementById("addUser");
	var search = document.getElementById("search");
	var search_res = document.getElementById("search_res");
	console.log(event);
	if(ele_id === "a_dept_chart"){
		dept_select.hidden = false;
		loc_select.hidden = true;
		deptpiechart.hidden = false;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}else if(ele_id === "a_loc_chart"){
		loc_select.hidden = false;
		dept_select.hidden = true;
		locpiechart.hidden = false;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_users"){
		addUser.hidden = false;
		dept_select.hidden = true;
		loc_select.hidden = true;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
	}else if(ele_id === "a_search"){
		dept_select.hidden = true;
		loc_select.hidden = true;
		search.hidden = false;
		search_res.hidden = false;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		addUser.hidden = true;
	}
}