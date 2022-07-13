<script>
	import SidebarLink from './SidebarLink.vue'
	import { collapsed, toggleSidebar, sidebarWidth, rotate } from './state'
	export default {
		props: {},
		components: {  SidebarLink },
		setup() {
			return { collapsed, toggleSidebar, sidebarWidth, rotate }
		}
	}
</script>

<template>
	<aside class="sidebar duration-300 h-screen p-7 pt-8 bg-zinc-900 relative items-center" :class="sidebarWidth">
		<span class="absolute cursor-pointer -right-3 bottom-9 w-7 h-7 border-2 border-zinc-900 bg-zinc-50 rounded-full duration-200" @click="toggleSidebar" :class="rotate"> 
			<fa class="p-1" icon="fa-solid fa-angle-double-left"/>
		</span>
		<div class="brand flex items-center gap-xl-4">
			<img class="w-12 h-12 cursor-pointer block mr-4" src="@/assets/Circle-icons-weather.svg" alt="logo">
			<h1 class="text-white font-medium text-2xl" v-if="!collapsed">ArduWeather</h1>
		</div>
		<h3 class="mt-6 text-center text-white">Menu</h3>
		<div class="menu mt-6 text-xl">
			<SidebarLink class="text-center" to="/" icon="fa-solid fa-table">Dashboard</SidebarLink>
			<SidebarLink to="/temperature" icon="fa-solid fa-temperature-half">Temperatura</SidebarLink>
			<SidebarLink to="/humidity" icon="fa-solid fa-tint">Humedad</SidebarLink>
			<SidebarLink to="/pressure" icon="fa-solid fa-gauge">Presión</SidebarLink>
			<SidebarLink to="/brightness" icon="fa-solid fa-lightbulb">Luminosidad</SidebarLink>
			<SidebarLink to="/map" icon="fa-solid fa-map-marked-alt">Mapa</SidebarLink>
			<SidebarLink to="/contact" icon="fa-solid fa-envelope">Contacto</SidebarLink>
			<SidebarLink to="/about" icon="fa-solid fa-circle-info">About</SidebarLink>
		</div>

	</aside>
</template>

<style>
	
</style>

<style scoped>
	/* .sidebar {
		color: white;
		background-color: var(--sidebar-bg);
		float: left;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		bottom: 0;
		padding: 0.5em;
		transition: 0.3s ease;
		display: flex;
		flex-direction: column;
	}
	.sidebar h1 {
		height: 2.5em;
	}

	.collapse-icon:hover {
		color: var(--sidebar-color-item-hover);
	}

	h3 {
		transition: opacity 0.3s ease-in-out;
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	} */
	.collapse-icon {
		color: red;
		transition: 0.2s linear;
	}
	.rotate-180 {
		transform: rotate(180deg);
		transition: 0.2s linear;
	}
</style>