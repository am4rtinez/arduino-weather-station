<template>
	<div class="humidity">
		<h1>Humedad</h1>
		<p>Gráficos de humedad.</p>
		<div class="chart">
			<LineChart v-if="loaded" 
				:label="label" 
				:chartData="chartData" 
				:chartLabels="chartLabels"
				:chartOptions="options"
				:background-color="backgroundColor"
				:point-border-color="pointBorderColor"
				:border-color="borderColor"
			/>
		</div>
	</div>
</template>

<script>
	import LineChart from "../components/charts/LineChart"
	import axios from 'axios'

	export default {
		name: 'Humidity',
		components: { LineChart },
		data: () => ({
			chartData: null,
			chartLabels: null,
			label: "Humedad (%)",
			options: null,
			backgroundColor: '#4552F4',
			borderColor: '#798EF8',
			pointBorderColor: '#4552F4',
			loaded: false
		}),
		async mounted(){
			this.loaded = false
			await axios.
			get('http://localhost:3001/api/humedad')
			.then((response) => {
				this.chartData = response.data.map(data => data.humidity)
				this.chartLabels = response.data.map(item => item.date)
				this.loaded = true,
				this.options = {
					responsive: true,
					maintainAspectRatio: false,
					tension: 0.3,
					scales: {
						y: {
							type: 'linear',
							min: 0,
							max: 100
						}
					},
					title: {
						display: true,
						text: 'Grafico de humedad'
					}
				}
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style>
	.chart{
		margin: auto;
		max-width: 80%;
	}
</style>