$(document).ready(function(){

	const url_temp_query = 'http://localhost/query.php';
	const url_hum_query = 'http://localhost/query.php?query=humidity';
	const url_preasure_query = 'http://localhost/query.php?query=preasure';

	var options = {
		scales:{
			yAxes:[{
				ticks:{
					beginAtZero:true
				}
			}]
		},       
    };	

	getData(url_temp_query, "temperature", "tempChart");
	getData(url_hum_query, "humidity", "humChart");
	getData(url_preasure_query, "preasure", "preasureChart"); 	

    async function getData(url, labeling, chart_id){
	    var data = {
			labels: [],
			datasets: [{
			label: labeling.charAt(0).toUpperCase() + labeling.slice(1),
			data: []
			}]
		};   	
		$.getJSON(url, function(result){
			$.each(result, function(i, field){
				var rt = new Date(field.date);
				var hours = rt.getHours() > 9 ? rt.getHours() : '0' + rt.getHours();
				var minutes = rt.getMinutes() > 9 ? rt.getMinutes() : '0' + rt.getMinutes();
				data.labels.push(hours + ':' + minutes);
				data.datasets[0].data.push((Math.round(field[labeling] * 10) / 10));
			});
			printChart(chart_id, data);  
		});
    };

    function printChart(item, data){
		// Instantiate a new chart
        var myLineChart = new Chart(document.getElementById(item).getContext("2d") , {
            type: "line",
            data: data,
            options 
        });
    };
});