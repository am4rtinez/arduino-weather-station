<template>
	<aside :style="{ width: sidebarWidth }" :collapsed="collapsed">
		<a href="/" class="header">
			<img class="logo" src="@/assets/Circle-icons-weather.svg" alt="logo">
		</a>
		<h3 v-if="!collapsed">ArduWeather</h3>
		<hr>
		<div class="menu">
			<SidebarLink to="/" icon="space_dashboard" class="button">Dashboard</SidebarLink>
			<SidebarLink to="/temperature" icon="device_thermostat" class="button">Temperatura</SidebarLink>
			<SidebarLink to="/humidity" icon="water_drop" class="button">Humedad</SidebarLink>
			<SidebarLink to="/pressure" icon="airwave" class="button">Presion</SidebarLink>
			<SidebarLink to="/brightness" icon="lightbulb" class="button">Luminosidad</SidebarLink>
			<SidebarLink to="/map" icon="explore" class="button">Mapa</SidebarLink>
			<SidebarLink to="/contact" icon="mail" class="button">Contacto</SidebarLink>
			<SidebarLink to="/about" icon="info" class="button">About</SidebarLink>
		</div>
		<div class="collapse-icon" @click="toggleSidebar" :class="{ 'rotate-180' : collapsed}"> 
			<fa icon="fa-solid fa-angle-double-left"/>
		</div>
	</aside>
</template>

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

<style scoped>
	aside {
		display: flex;
		flex-direction: column;
		background-color: var(--sidebar-bg);
		color: white;
		overflow: hidden;
		min-height: 100vh;
		min-width: 90px;
		transition: 0.2s ease-out;
		margin: 0;
	}

	aside .header{
		margin: 1em 0;
	}

	aside h3 {
		margin: 0 0 1em 0;
	}

	aside hr{
		width: 90%;
		margin-right: auto !important;
		margin-left: auto !important;
	}

	.menu {
		margin-top: 3rem;
	}

	.logo {
		width: 3rem;
		height: 3rem;
		margin-right: auto !important;
		margin-left: auto !important;
	}

	.sidebar {
		min-height: 100vh;
		max-height: 100vh;
		background-color: var(--sidebar-bg);
	}

	.sidebar ul{
		list-style: none;
		margin: 0;
	}

	.collapse-icon {
		width: 1.75rem;
		height: 1.75rem;
		cursor: pointer;
		position: absolute;
		bottom: 2.25rem;
		left: 1.75rem;
		color: white;
		transition: 0.2s linear;
		z-index: 0;
	}
	.collapse-icon svg {
		padding: .3rem;
	}
	.collapse-icon:hover {
		color: var(--sidebar-color-item-hover);
	}

	.rotate-180 {
		transform: rotate(180deg);
		transition: 0.2s linear;
	}
</style>