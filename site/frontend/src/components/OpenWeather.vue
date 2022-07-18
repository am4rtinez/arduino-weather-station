<template>
	<div v-if="mounted">
		<div class="card">
			<div class="card-header">
				<h2>{{ weather.name }} - {{ weather.sys.country}}</h2>
			</div>
			<div class="card-body">
				<img :src="weather.weather[0].icon" alt="Icono tiempo">
				<h4 class="desc">{{ weather.weather.description }}</h4>
				<p>
						<span class="material-symbols-rounded icon">device_thermostat</span>
						<span class="text">Temp: {{ round(weather.main.temp) }}&deg;</span>
				</p>
				<p class="max">
						<span class="material-symbols-rounded icon">device_thermostat</span>
						<span class="text">Max: {{ round(weather.main.temp_max) }}&deg;</span>
				</p>
				<p class="min">
						<span class="material-symbols-rounded icon">device_thermostat</span>
						<span class="text">Min: {{ round(weather.main.temp_min) }}&deg;</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">device_thermostat</span>
						<span class="text">Sensación térmica: {{ round(weather.main.feels_like) }}&deg;</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">water_drop</span>
						<span class="text">Humedad: {{ weather.main.humidity }}%</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">airwave</span>
						<span class="text">Presión: {{ weather.main.pressure }} hPa</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">air</span>
						<span class="text">Velocidad: {{ weather.wind.speed }} m/s</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">explore</span>
						<span class="text">Direccion: {{ weather.wind.deg }}&deg;</span>
				</p>
				<p>
						<span class="material-symbols-rounded icon">cyclone</span>
						<span class="text">Rafaga: {{ weather.wind.gust }} m/s</span>
				</p>
			</div>
			<div class="card-footer">
				<div>
					<span class="material-symbols-rounded icon">sync</span>
					<span class="text">{{ convertDate(weather.dt) }}</span>
				</div>
				<!-- <fa :icon="icon" class="icon"/> <span>{{ convertDate(weather.dt) }}</span> -->
			</div>
		</div>
		<div class="card">
			<div class="card-body">
				<p class="flex">
						<span class="material-symbols-rounded icon">air</span>
						<span class="text">Velocidad: {{ weather.wind.speed }} m/s</span>
				</p>
				<p class="flex">
						<span class="material-symbols-rounded icon">explore</span>
						<span class="text">Direccion: {{ weather.wind.deg }}&deg;</span>
				</p>
				<p class="flex">
						<span class="material-symbols-rounded icon">cyclone</span>
						<span class="text">Rafaga: {{ weather.wind.gust }} m/s</span>
				</p>
			</div>
			<div class="card-footer">
				<div class="flex">
					<span class="material-symbols-rounded icon">sync</span>
					<span class="text">{{ convertDate(weather.dt) }}</span>
				</div>
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
		margin-top: 1em;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		padding: 1em;
		width: 20em;
		background-color: white;
	}
	.card-footer {
		margin-top: 1em;
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