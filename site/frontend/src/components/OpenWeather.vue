<template>
	<div v-if="mounted" class="row">
		<div class="column">
			<div class="row">
				<!-- Info del tiempo -->
				<div class="card">
					<div class="card-body">
						<div class="column">
							<img :src="weather.weather[0].icon" alt="Icono tiempo">
							<h4 class="desc">{{ weather.weather[0].description }}</h4>
						</div>
					</div>
					<div class="card-footer">
						<div class="flex">
							<span class="material-symbols-rounded icon">sync</span>
							<span class="text">{{ convertDate(weather.dt) }}</span>
						</div>
					</div>
				</div>
				<!-- Info temperatura -->
				<div class="card">
					<div class="card-body">
						<div class="column">
							<p class="flex">
								<span class="material-symbols-rounded icon">device_thermostat</span>
								<span class="text">Temp: {{ round(weather.main.temp) }}&deg;</span>
							</p>
							<p class="flex max">
									<span class="material-symbols-rounded icon">device_thermostat</span>
									<span class="text">Max: {{ round(weather.main.temp_max) }}&deg;</span>
							</p>
							<p class="flex min">
									<span class="material-symbols-rounded icon">device_thermostat</span>
									<span class="text">Min: {{ round(weather.main.temp_min) }}&deg;</span>
							</p>
							<p class="flex">
									<span class="material-symbols-rounded icon">device_thermostat</span>
									<span class="text">Sensación: {{ round(weather.main.feels_like) }}&deg;</span>
							</p>
						</div>
					</div>
					<div class="card-footer">
						<div class="flex">
							<span class="material-symbols-rounded icon">sync</span>
							<span class="text">{{ convertDate(weather.dt) }}</span>
						</div>
					</div>
				</div>
				<!-- Info viento -->
				<div class="card">
					<div class="card-body">
						<div class="column">
							<p class="flex">
									<span class="material-symbols-rounded icon">air</span>
									<span class="text">Velocidad: {{ weather.wind.speed }} m/s</span>
							</p>
							<p class="flex">
									<span class="material-symbols-rounded icon">explore</span>
									<span class="text">Direccion: {{ weather.wind.deg }}&deg;</span>
							</p>
							<p class="flex" v-if="weather.wind.gust">
									<span class="material-symbols-rounded icon">cyclone</span>
									<span class="text">Rafaga: {{ weather.wind.gust }} m/s</span>
							</p>
						</div>
					</div>
					<div class="card-footer">
						<div class="flex">
							<span class="material-symbols-rounded icon">sync</span>
							<span class="text">{{ convertDate(weather.dt) }}</span>
						</div>
					</div>
				</div>
				<!-- Info presion y humedad -->
				<div class="card">
					<div class="card-body">
						<div class="column">
							<p class="flex">
								<span class="material-symbols-rounded icon">water_drop</span>
								<span class="text">Humedad: {{ weather.main.humidity }}%</span>
							</p>
							<p class="flex">
									<span class="material-symbols-rounded icon">airwave</span>
									<span class="text">Presión: {{ weather.main.pressure }} hPa</span>
							</p>
						</div>
					</div>
					<div class="card-footer">
						<div class="flex">
							<span class="material-symbols-rounded icon">sync</span>
							<span class="text">{{ convertDate(weather.dt) }}</span>
						</div>
					</div>
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
				console.log(response)
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
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		padding: 1em;
		/* width: 20em; */
		background-color: white;
	}
	.card-body {
		height: 8em;
	}
	.card-body > .column > img{
		margin: auto;
		width: 80px;
		height: 80px;
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