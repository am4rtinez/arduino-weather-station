async function initMapLeaflet() {
	let json_apik = await getApiKeys();
	
	const api_key_ow = json_apik.API_KEY_OW;
	const api_key_mapbox = json_apik.API_KEY_MAPBOX;

	let mymap = L.map('map').setView([39.5494, 2.5502], 11);

	if ("geolocation" in navigator) {
		// la geolocalización está disponible 
		navigator.geolocation.getCurrentPosition(function(position) {
			const navLat = position.coords.latitude;
			const navLong = position.coords.longitude;
			//var markerLocation = L.marker([navLat,navLong]);
			//markerLocation.addTo(mymap);
		});
	} else {
		// la geolocalización NO está disponible 
	}

	var grayscale = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		maxZoom: 500, attribution: '&copy;<a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(mymap);

	//TileLayer de Mapbox que muestra las calles
	var mapboxStreetsTL = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${api_key_mapbox}`, {
	    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	    maxZoom: 18,
	    id: 'mapbox/streets-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: ''
	});

	var mapboxTerrainTL = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${api_key_mapbox}`, {
	    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	    maxZoom: 18,
	    id: 'mapbox/mapbox.mapbox-terrain-v2',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: ''
	});

	let trafficLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGxtYXBib3giLCJhIjoiY2s3MHkzZ3VnMDFlbDNmbzNiajN5dm9lOCJ9.nbbtDF54HIXo0mCiekVxng', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'plmapbox/ck860jimr0kf91ip8l61a5g00',
		tileSize: 512,
		zoomOffset: -1
	});

	var mapboxOutdorsTL = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${api_key_mapbox}`, {
	    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	    maxZoom: 18,
	    id: 'mapbox/outdoors-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: ''
	}).addTo(mymap);

	var temp = L.tileLayer(`http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${api_key_ow}&lang=es`, {
		maxZoom: 200,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'temp'
	});

	var clouds = L.tileLayer(`http://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${api_key_ow}&lang=es`, {
		maxZoom: 200,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'clouds_new'
	});

	var precipitation = L.tileLayer(`http://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${api_key_ow}&lang=es`, {
		maxZoom: 200,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'precipitation_new'
	});

	var wind = L.tileLayer(`http://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${api_key_ow}&lang=es`, {
		maxZoom: 200,
	  attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>',
	  id: 'wind_new'
	});

	//Crea el layer de ciudades en las que se muestra la temperatura del forecast OpenWeather.
	var cities = L.layerGroup();

	//Retrieve de data in JSON format from the server.
	const api_url = '/weather_cities';
	const response = await fetch(api_url);
	const json_cities = await response.json();

	for (item of json_cities){
		ponerMarkers(item);
	}
	cities.addTo(mymap);

	//Crea los grupos de capas base y overlay.
	let baseMaps = {
	    "Grayscale": grayscale,
	    "Calles": mapboxStreetsTL,
			"Elevacion": mapboxOutdorsTL,
			"Terreno": mapboxTerrainTL
	};
	let overlayMaps = {
	    "Temperature": temp,
	    "Clouds": clouds,
	    "Precipitation": precipitation,
	    "Wind": wind,
			"Cities": cities,
			"Traffic": trafficLayer
	};

	const control = L.control.layers(baseMaps, overlayMaps).addTo(mymap);

	ponerLeyenda();


	function ponerMarkers(item){
	//	console.log(item);
		var name = item.name;
		var lat = item.coord.lat;
		var lon = item.coord.lon;
		var temperatura = Math.floor(item.main.temp);

		//Genera el div del Tooltip.
		var string = "<div class='row weather-data'>";
		if (temperatura <= -50){
			string = string + "<span class = 'temp c-min-50'>";
		} else if (temperatura > -50 && temperatura <= -45) {
			string = string + "<span class = 'temp c-min-45'>";
		} else if (temperatura > -45 && temperatura <= -40) {
			string = string + "<span class = 'temp c-min-40'>";
		} else if (temperatura > -45 && temperatura <= -40) {
			string = string + "<span class = 'temp c-min-40'>";
		} else if (temperatura > -40 && temperatura <= -35) {
			string = string + "<span class = 'temp c-min-35'>";
		} else if (temperatura > -35 && temperatura <= -30) {
			string = string + "<span class = 'temp c-min-30'>";
		} else if (temperatura > -30 && temperatura <= -25) {
			string = string + "<span class = 'temp c-min-25'>";
		} else if (temperatura > -25 && temperatura <= -20) {
			string = string + "<span class = 'temp c-min-20'>";
		} else if (temperatura > -20 && temperatura <= -15) {
			string = string + "<span class = 'temp c-min-15'>";
		} else if (temperatura > -15 && temperatura <= -10) {
			string = string + "<span class = 'temp c-min-10'>";
		} else if (temperatura > -10 && temperatura <= -5) {
			string = string + "<span class = 'temp c-min-5'>";
		} else if (temperatura > -5 && temperatura < 5) {
			string = string + "<span class = 'temp c-0'>";
		} else if (temperatura >= 5 && temperatura < 10) {
			string = string + "<span class = 'temp c-plus-5'>";
		} else if (temperatura >= 10 && temperatura < 15) {
			string = string + "<span class = 'temp c-plus-10'>";
		} else if (temperatura >= 15 && temperatura < 20) {
			string = string + "<span class = 'temp c-plus-15'>";
		} else if (temperatura >= 20 && temperatura < 25) {
			string = string + "<span class = 'temp c-plus-20'>";
		} else if (temperatura >= 25 && temperatura < 30) {
			string = string + "<span class = 'temp c-plus-25'>";
		} else if (temperatura >= 30 && temperatura < 35) {
			string = string + "<span class = 'temp c-plus-30'>";
		} else if (temperatura >= 35 && temperatura < 40) {
			string = string + "<span class = 'temp c-plus-35'>";
		} else if (temperatura >= 40 && temperatura < 45) {
			string = string + "<span class = 'temp c-plus-40'>";
		} else if (temperatura >= 45 && temperatura < 50) {
			string = string + "<span class = 'temp c-plus-45'>";
		} else if (temperatura >= 50) {
			string = string + "<span class = 'temp c-plus-50'>";
		}

		string = string + temperatura + "</span><span class='text-center city'>" + name +"</span></div>";

		var iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

		var popupContent = '<span class="center"><img src="' + iconUrl + '" alt="Smiley face" height="75" width="75"></span><br/>'
			+ '<span class="content-popup"><b>Name: </b>' + item.name + '</span><br/>'
			+ '<span class="content-popup"><b>Id: </b>' + item.id + '</span><br/>'
			+ '<span class="content-popup"><b>Toma Datos: </b>' + convertDate(item.dt) + '</span><br/>'
			+ '<span class="content-popup"><b>Sunrise: </b>' + convertDate(item.sys.sunrise) + '</span><br/>'
			+ '<span class="content-popup"><b>Sunset: </b>' + convertDate(item.sys.sunset) + '</span><br/>'
			+ '<span class="content-popup"><b>Tiempo: </b>' + item.weather[0].main + '</span><br/>'
			+ '<span class="content-popup"><b>Temperature: </b>' + item.main.temp + '&deg;C</span><br/>'
			+ '<span class="content-popup"><b>Sensación: </b>' + item.main.feels_like + '&deg;C</span><br/>'
			+ '<span class="content-popup"><b>Temp min: </b>' + item.main.temp_min + '&deg;C</span><br/>'
			+ '<span class="content-popup"><b>Temp max: </b>' + item.main.temp_max + '&deg;C</span><br/>'
			+ '<span class="content-popup"><b>Presión atḿosférica: </b>' + item.main.pressure + ' bar</span><br/>'
			+ '<span class="content-popup"><b>Humedad Relativa: </b>' + item.main.humidity + '&#37;</span><br/>'
			+ '<span class="content-popup"><b>Vel. Viento: </b>' + item.wind.speed + ' m/s</span><br/>';

		var marker = L.circle([lat,lon], {
			color: 'black',
			fillcolor: 'black',
			fillOpacity: 1,
			radius: 200
		}).bindTooltip(string, {
			permanent: true,
			opacity: 1,
			direction: 'right',
			interactive: true,
			offset: new L.Point(0,0)
		});
		marker.bindPopup(popupContent).openPopup();
		marker.addTo(cities);
	}

	function ponerLeyenda(){
		var legend = L.control({position: 'bottomleft'});
		legend.onAdd = function (mymap) {
			var div = L.DomUtil.create('div', 'row control-legend');
			div.innerHTML += '<div class="color-scale-line">'
				+'<div class="scale-value min-value">'
					+'<span>-50ºC</span>'
				+'</div>'
				+'<div class="scale-value avg-value">'
					+'<span>0ºC</span>'
				+'</div>'
				+'<div class="scale-value max-value">'
					+'<span">50ºC</span>'
				+'</div>'
			+'</div>';
	    return div;
		};
		legend.addTo(mymap);
	}	
}

function convertDate(timestamp){
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(timestamp * 1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();
	
	if(hours<10) {hours = "0" + hours};

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

async function initMapbox() {
	let navLat = 39.5661;
	let navLong = 2.6484;
	let json_apik = await getApiKeys();
	
	const api_key_ow = json_apik.API_KEY_OW;
	const api_key_mapbox = json_apik.API_KEY_MAPBOX;
	if ("geolocation" in navigator) {
		// la geolocalización está disponible
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position.coords);
		});
	} else {
		// la geolocalización NO está disponible
	}

	//mapboxgl.accessToken = 'pk.eyJ1IjoiYW00cnRpbmV6IiwiYSI6ImNrOTNsY3p6djAyMDAzbHJ1ZW9uMWF3bzkifQ.bWWGuFChx--vInNm-Jktcg';
	mapboxgl.accessToken = api_key_mapbox;
	let map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/outdoors-v11',
		zoom: 10,
		center: [navLong, navLat]
	});

	//map.addControl(new mapboxgl.NavigationControl());
	const nav = new mapboxgl.NavigationControl();
	const geocoder = new MapboxGeocoder({
		accessToken: api_key_mapbox,
		mapboxgl: mapboxgl,
		collapsed: true
	});
	let legend = new mapboxgl.legend();
	map.addControl(geocoder, 'top-left');
	map.addControl(nav, 'top-left');
	map.addControl(legend, 'bottom-left');

	var scale = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'imperial'
	});
	map.addControl(scale);
	scale.setUnit('metric');

	map.on('load', function() {		 
		// add source and layer for contours
		map.addSource('contours', {
			type: 'vector',
			url: 'mapbox://mapbox.mapbox-terrain-v2'
		});
		map.addLayer({
			'id': 'contours',
			'type': 'line',
			'source': 'contours',
			'source-layer': 'contour',
			'layout': {
				// make layer visible by default
				'visibility': 'visible',
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#877b59',
				'line-width': 1
			}
		});
				
	});

	let toggleableLayerIds = ['contours'];
 
	// set up the corresponding toggle button for each layer
	for (var i = 0; i < toggleableLayerIds.length; i++) {
	var id = toggleableLayerIds[i];
	
	var link = document.createElement('a');
	link.href = '#';
	link.className = 'active';
	link.textContent = id;
	
	link.onclick = function(e) {
		var clickedLayer = this.textContent;
		e.preventDefault();
		e.stopPropagation();
		
		var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
		
		// toggle layer visibility by changing the layout object's visibility property
		if (visibility === 'visible') {
			map.setLayoutProperty(clickedLayer, 'visibility', 'none');
			this.className = '';
		} else {
			this.className = 'active';
			map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
		}
	};
	
	var layers = document.getElementById('menu');
	layers.appendChild(link);
	}
}

async function getApiKeys(){
	const url = 'getapikeys';
	const response = await fetch(url);
	const json = await response.json();
	return json;
}