document.addEventListener('DOMContentLoaded', function() {
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
	// fetch("/admin/departments").then(function(res){ 
	// 	// Calling .json() gets you a promise for the body of the http response that is yet to be loaded.
	// 	// console.log(response.json()); // this would just return a promise object
	// 	return res.json();  // promise return from this .then
	// }).then(function(data) {

	// 	    drawPieChart(data, "departments", "Departments", "deptpiechart");
	// 		$(window).resize(() => { drawPieChart(data, "departments", "Departments", "deptpiechart"); });
	// });
	setChart("/admin/departments", "departments", "Departments", "deptpiechart")
	setChart("/admin/locations", "locations", "Locations", "locpiechart");
    $.ajax({
        url: "/admin/departments/all",
        type: 'GET',
        success: (data) => { 
        	var deptData = JSON.parse(data);
        	deptData.forEach(function(dept){
        		console.log(dept.id, dept.name);
			    var option = document.createElement("option");
			    option.textContent = dept.name;
			    option.value = dept.id;
			    dept_select.appendChild(option);
        	});
        }
    }); 
    $.ajax({
        url: "/admin/locations/all",
        type: 'GET',
        success: (data) => { 
        	var locData = JSON.parse(data);
        	locData.forEach(function(loc){
			    var option = document.createElement("option");
			    option.textContent = loc.city;
			    option.value = loc.id;
			    loc_select.appendChild(option);
        	});
        }
    }); 
    $("#dept_select").change({ele: "deptpiechart"}, selectHandler);
    $("#loc_select").change({ele: "locpiechart"}, selectHandler);
}, false);
function setChart(url, category, title, ele){
	fetch(url)
	.then(handleErrors)
	.then(parseJSON)
	.then(data => handleData(data, category, title, ele))
	.catch(displayErrors);
}
function parseJSON(res){
	// we need to parse our obj to json
	return res.json(); 
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
function selectHandler(event){
	console.log(event.data.ele);
	console.log($(this).val());
	if(event.data.ele === "deptpiechart" && $(this).val() === "all"){
		console.log("getting all dept data");
		setChart("/admin/departments", "departments", "Departments", "deptpiechart")
	}else if(event.data.ele === "locpiechart" && $(this).val() === "all"){
		setChart("/admin/locations", "locations", "Locations", "locpiechart");
	}else{
		setChart("/admin/departments/" + $(this).val(), "", "", event.data.ele);
	}
}
function handleData(data, category, title, ele){
	// var myData = JSON.parse(data);
    drawPieChart(data, category, title, ele);
	$(window).resize(() => { drawPieChart(myData, category, title, ele); });
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