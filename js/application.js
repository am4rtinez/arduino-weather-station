$(document).ready(function(){

	const url_temp_query = 'http://localhost/query.php';
	const url_hum_query = 'http://localhost/query.php?query=humidity';
	const url_preasure_query = 'http://localhost/query.php?query=preasure';

	var options = {
		legend: {
            display: false,
        },
		scales:{
			xAxes: [{
				gridLines: {
					borderDash: [2, 5],
				},
			}],
			yAxes:[{
				gridLines: {
					display: false,
				},
				ticks:{
					beginAtZero:true
				}
			}]
		},
		fontFamily: "Montserrat",
		color: '#FFFFFF',
		showScale: false,
	    scaleShowLabels: false,
	    scaleShowGridLines : false,
	    pointDot : false,
	    pointDotRadius : 0,
	    pointDotStrokeWidth : 0,
	    pointHitDetectionRadius : 0,
	    datasetStroke : true,
	    datasetStrokeWidth : 3,
	    datasetFill : true,       
    };	

	getData(url_temp_query, "temperature", "tempChart", "#FF0000");
	getData(url_hum_query, "humidity", "humChart", "#0000FF");
	getData(url_preasure_query, "preasure", "preasureChart", "#00FF00"); 	

    async function getData(url, labeling, chart_id, color){
	    var data = {
			labels: [],
			datasets: [{
				label: labeling.charAt(0).toUpperCase() + labeling.slice(1),
				borderColor: color,
	            pointBorderColor: color,
	            pointBackgroundColor: color,
	            pointHoverBackgroundColor: "#80b6f4",
	            pointHoverBorderColor: "#80b6f4",
	            pointBorderWidth: 2,
	            pointHoverRadius: 10,
	            pointHoverBorderWidth: 1,
	            pointRadius: 6,
	            fill: false,
	            borderWidth: 4,
				data: []
			}]
		};   	
		$.getJSON(url, function(result){
			$.each(result, function(i, field){
				var rt = new Date(field.date);
				var hours = rt.getHours() > 9 ? rt.getHours() : '0' + rt.getHours();
				var minutes = rt.getMinutes() > 9 ? rt.getMinutes() : '0' + rt.getMinutes();
				data.labels.push(hours + ':' + minutes);
				data.datasets[0].data.push(field[labeling]);
			});
			printChart(chart_id, data);  
		});
    };

    function printChart(item, data){
    	Chart.defaults.global.defaultFontFamily = "Montserrat";
    	Chart.defaults.scale.gridLines.color = "#FFFFFF";
        var myLineChart = new Chart(document.getElementById(item).getContext("2d") , {
            type: "line",
            data: data,
            options 
        });
    };
});