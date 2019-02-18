
function drawPieChart(chartData, category, title, ele) {
    google.charts.load('current', {'packages':['corechart'], callback: () => {
        var newData = [];
        var mywidth = $(window).width();
        newData.push([category, 'Awards Received']);
        chartData.forEach(function(data){
            newData.push([data.Category, data.Award_Count]);
        });
        if(mywidth > 640){
            console.log("LARGE SCREEN DETECTED")
            mywidth = $(window).width() * .70;
        }
        var options = {
            title: title,
            width: mywidth,
            height: $(window).height()
        };
        var data = google.visualization.arrayToDataTable(newData);
        var chart = new google.visualization.PieChart(document.getElementById(ele));

        chart.draw(data, options);
    }});
}
