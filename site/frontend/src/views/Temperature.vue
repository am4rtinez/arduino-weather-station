<template>
	<div class="temperature">
		<h1>Temperaturas</h1>
		<p>Gráfico de temperaturas.</p>
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
		name: 'Temperature',
		components: { LineChart },
		data: () => ({
			chartData: null,
			chartLabels: null,
			label: "Temp (°C)",
			options: null,
			backgroundColor: '#F44545',
			borderColor: '#f87979',
			pointBorderColor: '#F44545',
			loaded: false
		}),
		async mounted(){
			this.loaded = false
			await axios.
			get('http://localhost:3001/api/temperaturas')
			.then((response) => {
				this.chartData = response.data.map(data => data.temperature)
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
							max: 45
						}
					},
					title: {
						display: true,
						text: 'Grafico de temperaturas'
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