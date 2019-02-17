document.addEventListener('DOMContentLoaded', function() {
	var a_charts = document.getElementById("a_charts");
    $.ajax({
        url: "/admin/departments",
        type: 'GET',
        success: function(data){
	    	var myData = JSON.parse(data);
	    	console.log(myData);
	    	drawPieChart(myData, "departments", "departments");
	    }
    }); 
}, false);

function updatePage(event){
	var ele_id = event.target.id;
	var piechart = document.getElementById("piechart");
	var search = document.getElementById("search");
	var search_res = document.getElementById("search_res");
	console.log(event);
	if(ele_id === "a_charts"){
		console.log(ele_id);
		piechart.hidden = false;
		search.hidden = true;
		search_res.hidden = true;
	}else if(ele_id === "a_users"){
		console.log(ele_id);
	}else if(ele_id === "a_search"){
		console.log(ele_id);
		search.hidden = false;
		piechart.hidden = true;
		search_res.hidden = false;
	}
}