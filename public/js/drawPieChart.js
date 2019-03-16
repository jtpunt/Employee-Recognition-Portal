// This function receives chart data which it uses to draw a pie chart on the screen
function drawPieChart(chartData, category, title, ele) {
    google.charts.load('current', {'packages':['corechart'], callback: () => {
        var newData = [];
        var mywidth = $(window).width(); // get the current window size
        newData.push([category, 'Awards Received']);
        chartData.forEach(function(data){
            newData.push([data.Category, data.Award_Count]);
        });
        if(mywidth > 640){ // do we have a large screen?
            console.log("LARGE SCREEN DETECTED")
            mywidth = $(window).width() * .70; // set the pie chart to take up 70% of the screen
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
