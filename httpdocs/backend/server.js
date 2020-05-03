require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')
const https = require('https')
const mariadb = require('./database');
const cors = require('cors');
const app = express();


//app.listen(3000, () => console.log('App listening on port 3000! Go to http://localhost:3000/'))
app.use(cors())
app.use(express.static('frontend'))

//Config headers & cors

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
}) 

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('App listening on port 3000! Go to https://localhost:3000/')
})

app.get('/weather_cities', async (request, response) => {

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
app.get('/current_weather_OW/:id', async (request, response) =>{
	let cityId = request.params.id;
	const apiKey = process.env.API_KEY_OW;
	const apiURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric&lang=es`
	const fetch_response = await fetch(apiURL);
	const json = await fetch_response.json();
  response.json(json);
}); 

app.get('/forecast_OW/:id', async (request, response) =>{
	let cityId = request.params.id;
	const apiKey = process.env.API_KEY_OW;
	const apiURL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric&lang=es&cnt=5`
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
app.get('/query/:query', (request, response) => {
	mariadb.getDataDB(request.params.query)
			.then(data => response.status(200).json(data))
			.catch(err => response.json(err))
})

app.get('/getapikeys', (request, response) => {
	let data = {
		"API_KEY_OW": process.env.API_KEY_OW,
		"API_KEY_MAPBOX": process.env.API_KEY_MAPBOX
	}

	response.json(data);
})
