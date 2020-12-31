const url_temp_query = 'api/getquery/temp20';
const url_hum_query = 'api/getquery/hum20';
const url_pressure_query = 'api/getquery/press20';
const url_brightness_query = 'api/getquery/brig20';
let api_key_mapbox = '';
let api_key_ow = '';

const options = {
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

getapikeys();

$(function(){

	//Carga las funciones en funcion de la localización de la URL.
	if (location.hash === '#/') {
		dashboardLoad();
	} 
	else if (location.hash === '#/owdata'){
		loadOWData();
	}
	else if (location.hash === '#/mapping'){
		initMapboxJS();
	}

	//Añade evento de clicado para cargar la vista en el main-panel.
	$('#dashboardLink').click(function(){
		dashboardLoad();
	});
	$('#owDataLink').click(function(){
		loadOWData();
	});
	$('#tempLink').click(function(){
		loadTempChart();
	});
	$('#humidityLink').click(function(){
		loadHumChart();
	});
	$('#mappingLink').click(function(){
		initMapboxJS();
	});

});

async function getapikeys(){
	const response = await fetch('api/getapikeys');
	const json = await response.json();
	api_key_mapbox = json['API_KEY_MAPBOX'];
	api_key_ow = json['API_KEY_OW'];
}

function dashboardLoad(){
	showCurrentStatus('api/current_weather_OW/2512989');
	getForecastData(document.getElementsByClassName('dataForecast'),'api/forecast_OW/2512989');
	//getLatestData(document.getElementsByClassName('lastTempData'), 'query/lastTemp', 'temperature', 'ºC');
	//getLatestData(document.getElementsByClassName('lastHumData'), 'query/lastHum', 'humidity', '%');
	//getLatestData(document.getElementsByClassName('lastPressData'), 'query/lastPress', 'pressure', 'hPa');
	//getLatestData(document.getElementsByClassName('lastBrigData'), 'query/lastBrig', 'brightness', 'Lux');
	loadTempChart();
	loadHumChart();
}

async function loadOWData(){
	const url = 'api/current_weather_OW/2512989';
	const item = document.getElementsByClassName('owData');
	const response = await fetch(url);
	const json = await response.json();
	let urlIcon =`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
	let time = convertTime(json.dt);

	$(item).html(`
		<div class="card-header">Condiciones Actuales</div>
		<div class="card-body">
			<p>Ciudad: ${json.name}</p>
			<p>Longitud: ${json.coord.lon}</p>
			<p>Latitud: ${json.coord.lat}</p>
			<p>${json.weather[0].main}</p>
			<p>${json.weather[0].description}</p>
		</div>
		<div class="card-footer text-center"> 
			<i class="fad fa-sync"></i> Ultima actualizacion: <span class="updated-time">${time}</span>
		</div>`
	);

}

async function loadTempChart(){
	getDataJSON(url_temp_query, "temperature", "tempChart", "#FE2E2E");
}

async function loadHumChart(){
	getDataJSON(url_hum_query, "humidity", "humChart", "#5858FA");
}

async function showCurrentStatus(url){
	const item = document.getElementsByClassName('dataCondActual');
	const response = await fetch(url);
	const json = await response.json();
	let urlIcon =`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
	let time = convertTime(json.dt);
	
	/*$(item).html(`
		<div class="content">
			<div class="col text-center">
				<b><span class="text-center">${convertTime(json.dt)}</span></b><br>
				<img src="${urlIcon}" alt="${json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1)}" width="110px"><br>
				<span class="">${jitem.main.temp}ºC</span>
			</div>`
	);*/

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
	const myLineChart = new Chart(document.getElementById(item).getContext("2d") , {
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

function initMapboxJS() {
	//console.log(location.pathname + location.hash);
	let navLat = 39.590;
	let navLong = 2.796;
	
	L.mapbox.accessToken = api_key_mapbox;
	/*
	// Create a map in the div #map
	if ("geolocation" in navigator) {
		// la geolocalización está disponible
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position.coords);
		});
	} else {
		// la geolocalización NO está disponible
		console.log("Geolocation is not suitable");
	}*/

	//Inicializa el mapa.
	var map = L.mapbox.map('map', null, { zoomControl: false });
	map.setView([navLat, navLong], 9.8);

	var basemaps = {
		'Mapbox Outdoors': L.mapbox.styleLayer('mapbox://styles/mapbox/outdoors-v11').addTo(map),
		'Mapbox Streets': L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'),
		'Mapbox Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v9'),
		'Mapbox Light': L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'),
		'Mapbox Dark': L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v10'),
		'Mapbox Sprite': L.mapbox.styleLayer('mapbox://styles/mapbox/bright-v8')
	}

	//Add mapbox contours mapbox://mapbox.mapbox-terrain-v2
	var templayer = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid='+ api_key_ow +'&lang=es', {
		maxZoom: 18,
	  	attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  	id: 'temp'
	})

	var cloudslayer = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid='+ api_key_ow +'&lang=es', {
		maxZoom: 18,
	  	attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  	id: 'clouds'
	})

	var precipitationlayer = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid='+ api_key_ow +'&lang=es', {
		maxZoom: 18,
	  	attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  	id: 'temp'
	})

	var pressurelayer = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid='+ api_key_ow +'&lang=es', {
		maxZoom: 18,
	  	attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  	id: 'temp'
	})

	var windlayer = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid='+ api_key_ow +'&lang=es', {
		maxZoom: 18,
	  	attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  	id: 'temp'
	});

	// Servei de mapa de les zones bàsiques de salut de les Illes Balears
	// URL: http://ideib.caib.es/cataleg/srv/cat/catalog.search#/metadata/cd39adff-7eea-4590-b9d8-ee5b772f78f5
	//- Zona Sanitària (ZBS_ZonaSanitaria): Zonificació de la cobertura dels centres sanitaris públicsque surt a partir de les unitats de les targetes sanitàries que amb el seu carrerer delimita les zones.
	//- Equipaments sanitaris (ZBS_EquipamentSanitari): Localització puntual dels centres sanitaris públics (centres sanitaris i unitats bàsiques de salut) de les Illes Balears. Alguns centres d'aquesta capa no coincideixen amb les zones bàsiques de salut vigents perquè estan pendents de construcció o inauguració.
	//- Equipaments hospitalaris (ZBS_EquipamentHospitalari): Localització puntual dels establiment on es proporciona assistència mèdica i sanitària completa.
	var zbs_zsanit = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_ZBS_IB/MapServer/WMSServer?', {
		layers: '0',
		format: 'image/png',
		transparent: true,
		opacity: 0.5,
		attribution: "© IDEIB-SITIBSA"
	});
	var zbs_esanit = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_ZBS_IB/MapServer/WMSServer?', {
		layers: '1',
		format: 'image/png',
		transparent: true,
		attribution: "© IDEIB-SITIBSA"
	});
	var zbs_ehospit = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_ZBS_IB/MapServer/WMSServer?', {
		layers: '2',
		format: 'image/png',
		transparent: true,
		attribution: "© IDEIB-SITIBSA"
	});
	// CDE Registre desfibril·ladors externs semiautomàtics (DESA)
	// URL: http://ideib.caib.es/cataleg/srv/cat/catalog.search;jsessionid=94C1836C02A2C5F3D4D7648687CDEB8D#/metadata/EAB67586-47DC-42C4-8031-4E26C8F33E45
	// Localització dels DESA del Registre de desfibril·ladors externs semiautomàtics (DESA) que recull les persones físiques o jurídiques, públiques o privades, registrats per part de la Direccio General d'Avaluació i Acreditació. El Decret 137/2008, de 12 de desembre, regula l'ús de desfibril·ladors externs semiautomàtics (DESA) en centres no sanitaris de les Illes Balears. Cal advertir hi ha alguns DESA georeferenciats únicament a nivell de via. Darrera actualització segons dades de juny de 2020.
	var desa = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_Salut_IB/MapServer/WMSServer?', {
		layers: '0',
		format: 'image/png',
		transparent: true,
		attribution: "© IDEIB-SITIBSA"
	});

	var desa = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_Salut_IB/MapServer/WMSServer?', {
        layers: '0',
        transparent: true,
		format: 'image/png',
		attribution: "© IDEIB-SITIBSA"
    });
	
	// CDE Red hidrográfica de las "Illes Balears" (capa provisional) 
	// URL: http://ideib.caib.es/cataleg/srv/spa/catalog.search;jsessionid=128BDA9BD989C0A8B103D6F2E1EAFB61#/metadata/88FBE74D-D15E-429E-9840-B7B2D128FCC0
	// Red hidrográfica provisional de las "Illes Balears" que representa los cursos hidrográficos que han podido ser detectados por restitución fotogramétrica a escala 1:5.000 (mayoritariamente a partir de fotografía aérea, aunque, en algunos casos, también se ha realizado trabajo de campo) . No se trata de una "red hidrológica" completamente conectada.
	var hidroIB = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_Hidrografia_IB/MapServer/WMSServer?', {
		layers: '0',
		format: 'image/png',
		transparent: true,
		opacity: 0.6,
		attribution: "© IDEIB-SITIBSA"
	});

	// CDE Producció i distribució energètica a les Illes Balears
	// Conjunt de dades espacials format pels elements de la xarxa de producció energètica del les Illes Balears; centrals convencionals, de cogeneració, parcs eòlics i parcs fotovoltaics, així com, els elements que configuren la distribució energètica; la xarxa de distribució d'electricitat, les subestacions i els gasoductes. Alguns elements d’aquest conjunt de dades espacials només són accessibles pels usuaris autoritzats pel propietari de les dades.
	var energia = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_ProdDistr_energia_IB/MapServer/WmsServer?', {
		layers: '0,1,2,3,4',
		format: 'image/png',
		transparent: true,
		attribution: "© IDEIB-SITIBSA"
	});

	// CDE Aptitud per a ubicar instal·lacions fotovoltaiques i eòliques a les Illes Balears
	// URL: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_Fotovo_Eol_IB/MapServer
	// Conjunt de dades espacials que zonifica l'aptitud del territori de les Illes Balears per ubicar instal·lacions de producció d'energia fotovoltaica o eòlica relativa al Pla Director d'Energies Renovables de les Illes Balears a escala 1:25.000 de 2014.
	var aptitudfoto = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_Fotovo_Eol_IB/MapServer/WmsServer?', {
		layers: '0',
		format: 'image/png',
		transparent: true,
		opacity: 0.7,
		attribution: "© IDEIB-SITIBSA"
	});
	var aptitudeol = L.tileLayer.betterWms('https://ideib.caib.es/geoserveis/services/public/GOIB_Fotovo_Eol_IB/MapServer/WmsServer?', {
		layers: '1',
		format: 'image/png',
		transparent: true,
		opacity: 0.7,
		attribution: "© IDEIB-SITIBSA"
	});

	var overlaymaps = {
		"Temperatura"	:	templayer,
		"Nubes"			:	cloudslayer,
		"Lluvia"		:	precipitationlayer,
		"Presion Atm"	:	pressurelayer,
		"Viento"		:	windlayer,
		"Zona Sanit"	:	zbs_zsanit,
		"Equip Sanit"	:	zbs_esanit,
		"Equip Hospit"	:	zbs_ehospit,
		"Desa"			:	desa,
		"Hidrografia"	:	hidroIB,
		"Prod / Dist Energetica"	: energia,
		"Aptitud Fotovoltaica"	:	aptitudfoto,
		"Aptitud Eolica"	:	aptitudeol,
	}

	L.control.layers(basemaps, overlaymaps).addTo(map);

	var geocoder = L.mapbox.geocoderControl('mapbox.places');

	//Inicializa el componente de escala.
	var scale = null;

	//Inicializa componente geolocalización.
	var geolocate =  null;
	//let legend = new mapboxgl.legend();
	map.addControl(geocoder, 'top-left');
	map.addControl(new L.Control.Zoom(), 'top-left');
	map.addControl(new L.Control.Fullscreen(),'top-left');
	//map.addControl(geolocate, 'top-left');
	map.addControl(L.mapbox.shareControl(), 'top-left');
	map.addControl(L.mapbox.legendControl('https://ideib.caib.es/geoserveis/rest/services/public/GOIB_Fotovo_Eol_IB/MapServer/legend?dynamicLayers=%5B0%5D&f=html'), 'bottom-right');
	map.addControl(L.control.scale({metric: true, imperial: false}), 'bottom-left');

}