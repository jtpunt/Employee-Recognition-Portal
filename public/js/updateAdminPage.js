document.addEventListener('DOMContentLoaded', function() {
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	// Sets the initial dept/loc pie charts with all depts/locs data included
	setChart("/admin/departments", "departments", "Departments", "deptpiechart");
	setChart("/admin/locations", "locations", "Locations", "locpiechart");

	setDropDown("/admin/departments/all", "dept_select"); // fills the dropdown menu with all dept names
	setDropDown("/admin/locations/all", "loc_select"); // fills the dropdown menu with all loc names
	dept_select.addEventListener("change", function(){
		if(this.value === "all") // did the admin select "all"?
			// sets the dept pie chart to include all dept data
			setChart("/admin/departments", "departments", "Departments", "deptpiechart"); 
		else
			// sets the dept pie chart to show only data associated with a specific dept
			setChart("/admin/departments/" + this.value, "", "", "deptpiechart");
	});
	loc_select.addEventListener("change", function(){
		if(this.value === "all") // did the admin select "all"?
			// sets the loc pie chart to include all loc data
			setChart("/admin/locations", "locations", "Locations", "locpiechart");
		else
			// sets the loc pie chart to show only data associated with a specific location
			setChart("/admin/locations/" + this.value, "", "", "locpiechart");
	})
}, false);
// sets the dept/loc pie charts with all depts/locs data included or with only individual dept/loc data included
// by calling the appropriate route, parsing the data, and then passing this data to handleChartData to setup, 
// display the pie chart on-screen, and redraw the chart if the user adjusts their window size
function setChart(url, category, title, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleChartData(data, category, title, ele))
	.catch(displayErrors);
}
// Receives all data needed to draw a pie chart
// Redraws the pie charts incase the window is resized
function handleChartData(data, category, title, ele){
    drawPieChart(data, category, title, ele);
    window.addEventListener("resize", () => drawPieChart(data, category, title, ele));
}
// Handles the on-click events from the a tags on the left-side of the admin dashboard by showing
// specific content associated with those a tags on the right-side of he user dashboard.
function updatePage(event){
	var ele_id = event.target.id;
	var emp_awards = document.getElementById("emp_awards");
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	var deptpiechart = document.getElementById("deptpiechart");
	var locpiechart = document.getElementById("locpiechart");
	var addUser = document.getElementById("addUser");
	var search = document.getElementById("search");
	var search_res = document.getElementById("search_res");
	console.log(event);
	if(ele_id === "a_emp_awards"){ // Does the admin want to view data on all granted awards?
		emp_awards.hidden = false;  // Show the table with data from all granted awards, hide the other content
		dept_select.hidden = true;
		loc_select.hidden = true;
		deptpiechart.hidden = true;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_dept_chart"){ // Does the admin want to view the dept pie chart?
		dept_select.hidden = false; // show the dept pie charts, hide the other content
		emp_awards.hidden = true;
		loc_select.hidden = true;
		deptpiechart.hidden = false;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}else if(ele_id === "a_loc_chart"){ // Does the admin want to view the loc pie chart?
		loc_select.hidden = false; // show the loc pie chart, hide the other content
		emp_awards.hidden = true;
		dept_select.hidden = true;
		locpiechart.hidden = false;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_add_user"){ // Does the admin want to add a user?
		addUser.hidden = false; // Show the add user form, hide the other content
		emp_awards.hidden = true;
		dept_select.hidden = true;
		loc_select.hidden = true;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
	}else if(ele_id === "a_search"){ // Does the admin want to search for a user?
		search.hidden = false; // Show the form to search for a user
		search_res.hidden = false; // Show the search results
		dept_select.hidden = true; 
		emp_awards.hidden = true;
		loc_select.hidden = true;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		addUser.hidden = true;
	}
}
