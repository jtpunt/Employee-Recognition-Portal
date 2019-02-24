document.addEventListener('DOMContentLoaded', function() {
	var dept_select  = document.getElementById("dept_select");
	var loc_select  = document.getElementById("loc_select");
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
    $.ajax({
        url: "/admin/departments/all",
        type: 'GET',
        success: (data) => { 
        	var deptData = JSON.parse(data);
        	deptData.forEach(function(dept){
        		console.log(dept.id, dept.name);
			    var el = document.createElement("option");
			    el.textContent = dept.name;
			    el.value = dept.id;
			    dept_select.appendChild(el);
        	});
        }
    }); 
    $.ajax({
        url: "/admin/locations/all",
        type: 'GET',
        success: (data) => { 
        	var locData = JSON.parse(data);
        	locData.forEach(function(loc){
			    var el = document.createElement("option");
			    el.textContent = loc.city;
			    el.value = loc.id;
			    loc_select.appendChild(el);
        	});
        }
    }); 
    $("#dept_select").change({ele: "deptpiechart"}, selectHandler);
    $("#loc_select").change({ele: "locpiechart"}, selectHandler);
}, false);
function selectHandler(event){
	console.log(event.data.ele);
	console.log($(this).val());
	if(event.data.ele === "deptpiechart" && $(this).val() === "all"){
		console.log("getting all dept data");
		$.ajax({
	        url: "/admin/departments",
	        type: 'GET',
	        success: (data) => { handleData(data, "departments", "Departments", "deptpiechart"); }
	    }); 
	}else if(event.data.ele === "locpiechart" && $(this).val() === "all"){
		$.ajax({
	        url: "/admin/locations",
	        type: 'GET',
	        success: (data) => { handleData(data, "locations", "Locations", "locpiechart"); }
    	}); 
	}else{
		$.ajax({
			url: "/admin/departments/" + $(this).val(),
			type: 'GET',
			success: function(data) {
				handleData(data, "", "", event.data.ele);
			}
		})
	}
}
function handleData(data, category, title, ele){
	var myData = JSON.parse(data);
    drawPieChart(myData, category, title, ele);
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