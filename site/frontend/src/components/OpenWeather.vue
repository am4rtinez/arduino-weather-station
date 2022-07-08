<template>
	<div>
		<div class="card">
			<div class="card-header">
				<h2>{{ ow.name }} - {{ ow.sys.country }}</h2>
			</div>
			<div class="card-body">
				<img :src="ow.weather.icon" alt="Icono tiempo">
				<h4 class="desc">{{ ow.weather.description }}</h4>
				<p><fa icon="fa-solid fa-temperature-half"/> Temp: {{ ow.main.temp }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-full" class="max"/> Max: {{ ow.main.temp_max }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-quarter" class="min"/> Min: {{ ow.main.temp_min }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-half"/> Sensación térmica: {{ ow.main.feels_like }}&deg;</p>
				<p><fa icon="fa-solid fa-droplet" /> Humedad: {{ ow.main.humidity }}%</p>
				<p><fa icon="fa-solid fa-gauge"/> Presión: {{ ow.main.pressure }} hPa</p>
			</div>
			<div class="card-footer">
				<fa :icon="icon" class="icon"/> <span>{{ ow.dt }}</span>
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
				ow:{
					id: '',
					name: '',
					coord: {
						lon: '',
						lat:''
					},
					weather: {
						id: '',
						main: '',
						description: '',
						icon: ''
					},
					main: {
						temp: 30,
						feels_like: 32,
						pressure: 1022,
						humidity: 60,
						temp_min: 40,
						temp_max: '10',
						sea_level: '',
						grnd_level: '',
					},
					visibility: '',
					wind: {
						speed: '' ,
						deg: '',
						gust: ''
					},
					clouds: {
						all: ''
					},
					dt: '13:45',
					sys: {
						country: '',
						sunrise: '',
						sunset: ''
					}
				}
			}
		},
		async mounted(){
			const apiKey = '94aafd624fbb4e7e0282a15dfa614356'
			const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=es&units=metric`
			await axios.get(baseURL)
			.then((response) => {
				console.log(response)
				this.ow.id = response.data.id
				this.ow.name = response.data.name
				this.ow.dt = Functions.convertDate(response.data.dt)
				this.ow.weather.main = response.data.weather[0].main
				this.ow.weather.description = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1)
				this.ow.weather.icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
				this.ow.main.temp = response.data.main.temp
				this.ow.main.feels_like = response.data.main.feels_like
				this.ow.main.humidity = response.data.main.humidity
				this.ow.main.pressure = response.data.main.pressure
				this.ow.main.temp_min = response.data.main.temp_min
				this.ow.main.temp_max = response.data.main.temp_max
				this.ow.main.sea_level = response.data.main.sea_level
				this.ow.main.grn_level = response.data.main.grnd_level
				this.ow.sys.country = response.data.sys.country
				this.ow.sys.sunrise = response.data.sys.sunrise
				this.ow.sys.sunset = response.data.sys.sunset
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
	.max {
		color: rgb(214, 90, 90);
	}
	.min {
		color: rgb(49, 137, 189);
	}
</style>