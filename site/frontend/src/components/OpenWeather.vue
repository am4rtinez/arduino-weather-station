<template>
	<div v-if="mounted">
		<div class="card">
			<div class="card-header">
				<h2>{{ weather.name }} - {{ weather.sys.country}}</h2>
			</div>
			<div class="card-body">
				<img :src="weather.weather[0].icon" alt="Icono tiempo">
				<h4 class="desc">{{ weather.weather.description }}</h4>
				<p><fa icon="fa-solid fa-temperature-half"/> Temp: {{ round(weather.main.temp) }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-full" class="max"/> Max: {{ round(weather.main.temp_max) }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-quarter" class="min"/> Min: {{ round(weather.main.temp_min) }}&deg;</p>
				<p><fa icon="fa-solid fa-temperature-half"/> Sensación térmica: {{ round(weather.main.feels_like) }}&deg;</p>
				<p><fa icon="fa-solid fa-droplet" /> Humedad: {{ weather.main.humidity }}%</p>
				<p><fa icon="fa-solid fa-gauge"/> Presión: {{ weather.main.pressure }} hPa</p>
				<p><fa icon="fa-solid fa-wind"/> Velocidad: {{ weather.wind.speed }} m/s</p>
				<p><fa icon="fa-solid fa-compass"/> Direccion: {{ weather.wind.deg }}&deg;</p>
				<p><fa icon="fa-solid fa-wind"/> Rafaga: {{ weather.wind.gust }} m/s</p>
			</div>
			<div class="card-footer">
				<fa :icon="icon" class="icon"/> <span>{{ convertDate(weather.dt) }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import MyFunctions from '@/lib/Functions'
	import API from '@/lib/API'

	export default {
		props: {
			icon: { type: String, required: true }
		},
		data() {
			return {
				mounted: false,
				weather: {},
				forecast: {}
			}
		},
		async mounted(){
			await API.getWeather().then(response => {
				// console.log(response)
				this.weather = response
				this.weather.weather[0].icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
				this.mounted = true
			}),
			await API.getForecast().then(response => {
				// console.log(response)
			})
		},
		methods: {
			convertDate: function (dt) {
				return MyFunctions.convertDate(dt)
			},
			round: function (item) {
				return Math.round(item)
			}
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