<template>
	<div class="container">
		<!-- <h1>Dashboard</h1>
		<p>Dashboard donde se mostraran las temperaturas</p> -->
		<OpenWeatherVue icon="fa-solid fa-sync" />
	</div>
</template>

<script>
	import OpenWeatherVue from '@/components/OpenWeather.vue'
	export default {
		name: 'Dashboard',
		components: {
			OpenWeatherVue
		}
	}
</script>

<style scoped>

</style>