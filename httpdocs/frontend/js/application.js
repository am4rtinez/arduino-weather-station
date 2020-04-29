$(document).ready(function(){
	const url_temp_query = 'query/temp20';
	const url_hum_query = 'query/hum20';
	const url_pressure_query = 'query/press20';
	const url_brightness_query = 'query/brig20';

	let pathname = window.location.pathname;
	$('.nav-item > a[href="'+pathname+'"]').parent().addClass('active');

	showCurrentStatus('current_weather_OW/2512989');
	getForecastData(document.getElementsByClassName('dataForecast'),'forecast_OW/2512989');
	//getLatestData(document.getElementsByClassName('lastTempData'), 'query/lastTemp', 'temperature', 'ºC');
	//getLatestData(document.getElementsByClassName('lastHumData'), 'query/lastHum', 'humidity', '%');
	//getLatestData(document.getElementsByClassName('lastPressData'), 'query/lastPress', 'pressure', 'hPa');
	//getLatestData(document.getElementsByClassName('lastBrigData'), 'query/lastBrig', 'brightness', 'Lux');

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

	getData();

	async function showCurrentStatus(url){
		const item = document.getElementsByClassName('dataCondActual');
		const response = await fetch(url);
		const json = await response.json();
		let urlIcon =`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
		let time = convertTime(json.dt);
		
		$(item).html(`<div class="content">
			<div class="col text-center">
				<img src="${urlIcon}" alt="${json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1)}" width="110px"><br>
			</div>
			<hr>
			<div class="footer text-center">
			<i class="fad fa-sync"></i> <span class="updated_time">${convertTime(json.dt)}</span>
			</div>`
		);

		//Imprime ultimos datos en los cards correspondientes. lastTempData lastHumData lastPressData lastBrigData lastWindData
		showLatestData(document.getElementsByClassName('lastTempData'), 'temperature', 'ºC', time, json.main.temp);
		showLatestData(document.getElementsByClassName('lastHumData'), 'humidity', '%', convertTime(json.dt), json.main.humidity);
		showLatestData(document.getElementsByClassName('lastPressData'), 'pressure', 'hPa', convertTime(json.dt), json.main.pressure);
		showLatestData(document.getElementsByClassName('lastWindData'),'wind', 'm/s', convertTime(json.dt), json.wind.speed);
		showLatestData(document.getElementsByClassName('lastBrigData'),'brightness', '', convertTime(json.dt), json.visibility);

	}

	async function getForecastData(item,url){
		const response = await fetch(url);
		const json = await response.json();

		let string = '<div class="content text-center"><div class="row">';

		for (jitem of json.list){
			let urlIcon =`http://openweathermap.org/img/wn/${jitem.weather[0].icon}@2x.png`;
			console.log(urlIcon);
			string = `${string}
				<div class="col">
					<b><span class="text-center">${convertTime(jitem.dt)}</span></b><br>
					<img src="${urlIcon}" alt="${jitem.weather[0].description.charAt(0).toUpperCase() + jitem.weather[0].description.slice(1)}" width="100px"><br>
					<span class="">${jitem.main.temp}ºC</span>
				</div>`;
		}
		$(item).html(`${string}</div></div>`);
	}

	function showLatestData(item, field, units, dt, data){
		let htmlCode = `<div class="content text-center"><div class="dataItem">`;
		switch (field) {
			case 'temperature':
				htmlCode = `${htmlCode}${setTempIcon(data)}`;
				//$(document.getElementsByClassName('temp-data')).html(`${data}`);
			break;
			case 'humidity':
				htmlCode = `${htmlCode}<i class="fa fa-tint dataIcon"></i>`;
			break;
			case 'pressure':
				htmlCode = `${htmlCode}<i class="fa fa-heat dataIcon"></i>`;
			break;
			case 'brightness':
				//htmlCode = `${htmlCode}<i class="fa fa-lightbulb dataIcon"></i>`;
				htmlCode = `${htmlCode}<i class="fa fa-eye dataIcon"></i>`;
			break;
			case 'wind':
				htmlCode = `${htmlCode}<i class="fa fa-wind dataIcon"></i>`;
			break;

		}
		$(item).html(`${htmlCode}<span class="dataField">${data}</span><span class="units">${units}</span></div></div>
		<hr><div class="footer text-center"><i class="fad fa-sync"></i> <span class="updated_time">${dt}</span></div>`);
	}

	/*async function showLatestData(item, url, field, units){
		const response = await fetch(url);
		const json = await response.json();
		let date=new Date(json[0].date);
		let hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
		let minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
		let formattedTime = hours + ':' + minutes;
		let htmlCode = `<div class="content text-center"><div class="dataItem">`;
		switch (field) {
			case 'temperature':
				htmlCode = `${htmlCode}${setTempIcon(json[0][field])}`;
			break;
			case 'humidity':
				htmlCode = `${htmlCode}<i class="fa fa-tint dataIcon"></i>`;
			break;
			case 'pressure':
				htmlCode = `${htmlCode}<i class="fa fa-heat dataIcon"></i>`;
			break;
			case 'brightness':
				htmlCode = `${htmlCode}<i class="fa fa-lightbulb dataIcon"></i>`;
			break;

		}
		$(item).html(`${htmlCode}<span class="dataField">${json[0][field]}</span><span class="units">${units}</span></div></div>
		<hr><div class="footer"><i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated_time">${formattedTime}</span></div>`);
	} */

	async function getData() {
		getDataJSON(url_temp_query, "temperature", "tempChart", "#FE2E2E");
		getDataJSON(url_hum_query, "humidity", "humChart", "#5858FA");
		//getDataJSON(url_pressure_query, "pressure", "pressureChart", "#2EC445");
		//getDataJSON(url_brightness_query, "brightness", "brightnessChart", "#E3D94B");
	}

	async function getDataJSON(url, labeling, chart_id, color){

		const response = await fetch(url);
		const json = await response.json();

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
				pointRadius: 5,
				fill: false,
				borderWidth: 4,
				data: []
			}]
		};

		for (item of json){
			var rt = new Date(item.date);
			var hours = rt.getHours() > 9 ? rt.getHours() : '0' + rt.getHours();
			var minutes = rt.getMinutes() > 9 ? rt.getMinutes() : '0' + rt.getMinutes();
			data.labels.push(hours + ':' + minutes);
			data.datasets[0].data.push(item[labeling]);
		}

		printChart(chart_id, data);
  };

	function printChart(item, data){
		Chart.defaults.global.defaultFontFamily = "Montserrat";
		Chart.defaults.global.defaultFontColor = "#000000";
			var myLineChart = new Chart(document.getElementById(item).getContext("2d") , {
					type: "line",
					data: data,
					options 
			});
	}

	function convertTime(timestamp){
		let date = new Date(timestamp * 1000);
		let hours = checkTime(date.getHours());
		let minutes = checkTime(date.getMinutes());
		let seconds = checkTime(date.getSeconds());

		// Will display time in 10:30:23 format
		let formattedTime = `${hours}:${minutes}`;
		return formattedTime;
	}

	function convertDate(timestamp){
		let date = new Date(timestamp * 1000);
		let hours = checkTime(date.getHours());
		let minutes = checkTime(date.getMinutes());
		let seconds = checkTime(date.getSeconds());

		let formattedDate = `${date.getMonth()} ${hours}:${minutes}:${seconds}`;
		return formattedTime;
	}

	function checkTime(i){
		if(i<10) {i = "0" + i};
		return i;
	}

	function setTempIcon (temperatura) {
		let html = `<i class="fa fa-thermometer-three-quarters dataIcon `;
		if (temperatura <= -50){
			html = `${html}t-min-50`;
		} else if (temperatura > -50 && temperatura <= -45) {
			html = `${html}t-min-45`;
		} else if (temperatura > -45 && temperatura <= -40) {
			html = `${html}t-min-40`;
		} else if (temperatura > -40 && temperatura <= -35) {
			html = `${html}t-min-35`;
		} else if (temperatura > -35 && temperatura <= -30) {
			html = `${html}t-min-30`;
		} else if (temperatura > -30 && temperatura <= -25) {
			html = `${html}t-min-25`;
		} else if (temperatura > -25 && temperatura <= -20) {
			html = `${html}t-min-20`;
		} else if (temperatura > -20 && temperatura <= -15) {
			html = `${html}t-min-15`;
		} else if (temperatura > -15 && temperatura <= -10) {
			html = `${html}t-min-10`;
		} else if (temperatura > -10 && temperatura <= -5) {
			html = `${html}t-min-05`;
		} else if (temperatura > -5 && temperatura < 5) {
			html = `${html}t-00`;
		} else if (temperatura >= 5 && temperatura < 10) {
			html = `${html}t-plus-05`;
		} else if (temperatura >= 10 && temperatura < 15) {
			html = `${html}t-plus-10`;
		} else if (temperatura >= 15 && temperatura < 20) {
			html = `${html}t-plus-15`;
		} else if (temperatura >= 20 && temperatura < 25) {
			html = `${html}t-plus-20`;
		} else if (temperatura >= 25 && temperatura < 30) {
			html = `${html}t-plus-25`;
		} else if (temperatura >= 30 && temperatura < 35) {
			html = `${html}t-plus-30`;
		} else if (temperatura >= 35 && temperatura < 40) {
			html = `${html}t-plus-35`;
		} else if (temperatura >= 40 && temperatura < 45) {
			html = `${html}t-plus-40`;
		} else if (temperatura >= 45 && temperatura < 50) {
			html = `${html}t-plus-45`;
		} else if (temperatura >= 50) {
			html = `${html}t-plus-50`;
		}
			html = `${html}"></i>`;
			return (html);
	}
});