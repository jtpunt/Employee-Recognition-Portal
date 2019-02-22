document.addEventListener('DOMContentLoaded', function() {
	var a_charts = document.getElementById("a_dept_chart");
    $.ajax({
        url: "/admin/departments",
        type: 'GET',
        success: (data) => { handleData(data, "departments", "Departments", "deptpiechart"); }
    }); 
    $.ajax({
        url: "/admin/locations",
        type: 'GET',
        success: (data) => { handleData(data, "locations", "Locations", "locpiechart"); }
    }); 
}, false);
function handleData(data, category, title, ele){
	var myData = JSON.parse(data);
    drawPieChart(myData, category, title, ele);
	$(window).resize(() => { drawPieChart(myData, category, title, ele); });
}
function updatePage(event){
	var ele_id = event.target.id;
	var deptpiechart = document.getElementById("deptpiechart");
	var locpiechart = document.getElementById("locpiechart");
	var addUser = document.getElementById("addUser");
	var search = document.getElementById("search");
	var search_res = document.getElementById("search_res");
	console.log(event);
	if(ele_id === "a_dept_chart"){
		deptpiechart.hidden = false;
		locpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}else if(ele_id === "a_loc_chart"){
		locpiechart.hidden = false;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
		addUser.hidden = true;
	}
	else if(ele_id === "a_users"){
		addUser.hidden = false;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		search.hidden = true;
		search_res.hidden = true;
	}else if(ele_id === "a_search"){
		search.hidden = false;
		search_res.hidden = false;
		locpiechart.hidden = true;
		deptpiechart.hidden = true;
		addUser.hidden = true;
	}
}