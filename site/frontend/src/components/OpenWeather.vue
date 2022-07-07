<template>
	<div>
		<div class="card">
			<div class="card-header">
				<h2>{{ weather.cityName }} - {{ weather.country }}</h2>
			</div>
			<div class="card-body">
				<img :src="weather.url_icon" alt="Icono tiempo">
				<p class="desc">{{ weather.description }}</p>
				<p>Temp: {{ weather.temp }}&deg;</p>
				<p>Max: {{ weather.temp_max }}&deg;</p>
				<p>Min: {{ weather.temp_min }}&deg;</p>
				<p>Sensación térmica: {{ weather.feels_like }}&deg;</p>
				<p>Humedad: {{ weather.humidity }}%</p>
				<p>Presión: {{ weather.pressure }}hPa</p>
			</div>
			<div class="card-footer">
				<fa :icon="icon" class="icon"/> <span>{{ weather.last_update }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Functions from '@/assets/js/functions'

	export default {
		name: 'OpenWeather',
		props: {
			icon: { type: String, required: true }
		},
		data() {
			return {
				city: 'Palma',
				weather: {
					cityName: '',
					country: '',
					description: '',
					temp: 30,
					temp_max: '10',
					temp_min: 40,
					feels_like: 32,
					humidity: 60,
					pressure: 1022,
					last_update: '13:45',
					url_icon: ''
				},
			}
		},
		async mounted(){
			const apiKey = '94aafd624fbb4e7e0282a15dfa614356'
			const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=es&units=metric`
			await axios.get(baseURL)
			.then((response) => {
				console.log(response)
				this.weather.cityName = response.data.name
				this.weather.country = response.data.sys.country
				this.weather.description = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1)
				this.weather.temp = response.data.main.temp
				this.weather.temp_max = response.data.main.temp_max
				this.weather.temp_min = response.data.main.temp_min
				this.weather.feels_like = response.data.main.feels_like
				this.weather.humidity = response.data.main.humidity
				this.weather.pressure = response.data.main.pressure
				this.weather.last_update = Functions.convertDate(response.data.dt)
				this.weather.url_icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.card {
		margin: auto;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		padding: 1em;
		width: 20em;
	}
	.card-footer {
		border-top: 1px solid rgba(19, 18, 18, 0.219);
		padding:1em 0.5em 0 0.5em;
	}
</style>