$(document).ready(function(){

	const url_temp_query = 'http://192.168.1.4/query.php';
	const url_hum_query = 'http://192.168.1.4/query.php?query=humidity';
	const url_preasure_query = 'http://192.168.1.4/query.php?query=preasure';
	const url_brightness_query = 'http://192.168.1.4/query.php?query=brightness';

	const hours = document.getElementById('dig_hours');
	const minutes = document.getElementById('dig_minutes');
	const seconds = document.getElementById('dig_seconds');
	
	var options = {
		legend: {
            display: false,
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'black'
            }
        },
		scales:{
			xAxes: [{
				gridLines: {
					borderDash: [2, 5],
					zeroLineColor: '#000',
					color: 'black'
				},
				ticks: { fontSize: 10 }
			}],
			yAxes:[{
				gridLines: {
					zeroLineColor: 'black',
					color: 'green',
					display: false
				},
				ticks:{
					beginAtZero:true
				}
			}]
		},
		fontFamily: "Montserrat",
		color: '#000000',
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

    var interval = setInterval(dig_time, 1000);
    getData();
	

	async function getData() {
		getDataJSON(url_temp_query, "temperature", "tempChart", "#FE2E2E");
		getDataJSON(url_hum_query, "humidity", "humChart", "#5858FA");
		getDataJSON(url_preasure_query, "preasure", "preasureChart", "#2EC445");
		getDataJSON(url_brightness_query, "brightness", "brightnessChart", "#E3D94B");
	}

	async function getDataJSON(url, labeling, chart_id, color){
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
    	Chart.defaults.global.defaultFontColor = "#000000";
        var myLineChart = new Chart(document.getElementById(item).getContext("2d") , {
            type: "line",
            data: data,
            options 
        });
    };

    function dig_time(){

		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();

		var dh = checkTime(h);
		var dm = checkTime(m);
		var ds = checkTime(s);
		
		hours.innerHTML = dh;
		minutes.innerHTML = dm;
		seconds.innerHTML = ds;
	}	

	function checkTime(i){
		if(i<10) {i = "0" + i};
		return i;
	}
});