
function drawPieChart(chartData, category, title) {
    google.charts.load('current', {'packages':['corechart'], callback: () => {
        var newData = [];
        newData.push([category, 'Awards Received']);
        chartData.forEach(function(data){
            newData.push([data.Category, data.Award_Count]);
        });
        console.log(newData);
        var options = {
          title: title
        };
        var data = google.visualization.arrayToDataTable(newData);
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
        console.log("DONE DRAWING CHART");
    }});
}
