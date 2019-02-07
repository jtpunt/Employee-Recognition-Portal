
function drawPieChart(chartData) {
    google.charts.load('current', {'packages':['corechart'], callback: () => {
        var newData = [];
        newData.push(['Department', 'Awards Received']);
        chartData.forEach(function(data){
            newData.push([data.Department, data.Award_Count]);
        });
        console.log(newData);
        var options = {
          title: 'Department Awards'
        };
        var data = google.visualization.arrayToDataTable(newData);
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);

    }});
}
