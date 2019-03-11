document.addEventListener('DOMContentLoaded', function() {
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	setChart("/admin/departments", "departments", "Departments", "deptpiechart");
	setChart("/admin/locations", "locations", "Locations", "locpiechart");
	setDropDown("/admin/departments/all", "dept_select");
	setDropDown("/admin/locations/all", "loc_select");
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

function handleChartData(data, category, title, ele){
    drawPieChart(data, category, title, ele);
    window.addEventListener("resize", () => drawPieChart(data, category, title, ele));
}
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
	if(ele_id === "a_emp_awards"){
		emp_awards.hidden = false;
		dept_select.hidden = true;
		loc_select.hidden = true;
		deptpiechart.hidden = true;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_dept_chart"){
		dept_select.hidden = false;
		emp_awards.hidden = true;
		loc_select.hidden = true;
		deptpiechart.hidden = false;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}else if(ele_id === "a_loc_chart"){
		loc_select.hidden = false;
		emp_awards.hidden = true;
		dept_select.hidden = true;
		locpiechart.hidden = false;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_users"){
		addUser.hidden = false;
		emp_awards.hidden = true;
		dept_select.hidden = true;
		loc_select.hidden = true;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
	}else if(ele_id === "a_search"){
		dept_select.hidden = true;
		emp_awards.hidden = true;
		loc_select.hidden = true;
		search.hidden = false;
		search_res.hidden = false;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		addUser.hidden = true;
	}
}
