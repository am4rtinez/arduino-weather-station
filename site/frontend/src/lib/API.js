// API.js
// Contiene funciones varias.

import axios from "axios"

const API_KEY = '94aafd624fbb4e7e0282a15dfa614356'
const CITY = 'Palma'
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&lang=es&units=metric`
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&lang=es&units=metric`

async function getWeather() {
	const response = await fetch(WEATHER_URL)
	return await response.json()

	// const response = await axios.get(WEATHER_URL)
	// return response
}

async function getForecast() {
	const response = await axios.get(FORECAST_URL)
	return response
}

export default {
	getWeather,
	getForecast
}