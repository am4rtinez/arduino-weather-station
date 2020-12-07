const { Router } = require('express');
const express = require('express');
const mariadb = require('../database');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/weather_cities', async (request, response) => {

	const cityIDs = "2512989,2514097,2520493,2514216,2521741,2516452,2510821,2512432,2521534,2511106,2514984";
	const apiKey = process.env.API_KEY_OW;
	const apiURL = `http://api.openweathermap.org/data/2.5/group?id=${cityIDs}&units=metric&lang=es&appid=${apiKey}`;
	const fetch_response = await fetch(apiURL);
	const json_cities = await fetch_response.json();
  response.json(json_cities.list);

});

/*
	Obtiene los datos de la ciudad pasando el identificador de la misma.
	URL: http://api.openweathermap.org/data/2.5/weather?id={city id}&appid={apiKey}
	Parametro ID: es el identificador de la ciudad.
*/
router.get('/current_weather_OW/:id', async (request, response) =>{
	let cityId = request.params.id;
	const apiKey = process.env.API_KEY_OW;
	const apiURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric&lang=es`
	const fetch_response = await fetch(apiURL);
	console.log(apiURL);
	const json = await fetch_response.json();
  response.json(json);
}); 

router.get('/forecast_OW/:id', async (request, response) =>{
	let cityId = request.params.id;
	const apiKey = process.env.API_KEY_OW;
	const apiURL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric&lang=es&cnt=5`
	console.log(apiURL);
	const fetch_response = await fetch(apiURL);
	const json = await fetch_response.json();
  response.json(json);
}); 

/*
	* Conexión a la BD para obtener datos obtenidos con Arduino.
	lastTemp - Obtiene el último dato de temperatura.
	lastHum - Obtiene el último dato de humedad relativa.
	lastPress - Obtiene el último dato de presión atmosférica.
	lastBrig - Obtiene el último dato de luminosidad.
	temp20 - Obtiene los últimos 20 datos de temperatura.
	hum20 - Obtiene los últimos 20 datos de humedad relativa.
	press20 - Obtiene los últimos 20 datos de presión atmosférica.
	brig20 - Obtiene los últimos 20 datos de luminosidad.
*/
router.get('/query/:query', (request, response) => {
	mariadb.getDataDB(request.params.query)
			.then(data => response.status(200).json(data))
			.catch(err => response.json(err))
})

router.get('/getapikeys', (request, response) => {
	let data = {
		"API_KEY_OW": process.env.API_KEY_OW,
		"API_KEY_MAPBOX": process.env.API_KEY_MAPBOX
	}

	response.json(data);
})


module.exports = router;