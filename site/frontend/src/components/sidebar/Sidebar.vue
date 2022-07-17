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
	<nav class="sidebar">
		<div class="sidebar-header">
			<img class="logo row mx-auto d-block" src="@/assets/Circle-icons-weather.svg" alt="logo">
			<!-- <h1 class="row" v-if="!collapsed">ArduWeather</h1> -->
		</div>
		<ul class="nav nav-pills">
			<li class="nav-item">Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
			<li>Item 4</li>
		</ul>
		<!-- <div class="collapse-icon" @click="toggleSidebar" :class="{ 'rotate-180' : collapsed}"> 
			<fa icon="fa-solid fa-angle-double-left"/>
		</div> -->
		<!-- <h3 class="mt-6 text-center text-white">Menu</h3> -->
		<!-- <div class="menu">
			<SidebarLink to="/" icon="fa-solid fa-table">Dashboard</SidebarLink>
			<SidebarLink to="/temperature" icon="fa-solid fa-temperature-half">Temperatura</SidebarLink>
			<SidebarLink to="/humidity" icon="fa-solid fa-tint">Humedad</SidebarLink>
			<SidebarLink to="/pressure" icon="fa-solid fa-gauge">Presión</SidebarLink>
			<SidebarLink to="/brightness" icon="fa-solid fa-lightbulb">Luminosidad</SidebarLink>
			<SidebarLink to="/map" icon="fa-solid fa-map-marked-alt">Mapa</SidebarLink>
			<SidebarLink to="/contact" icon="fa-solid fa-envelope">Contacto</SidebarLink>
			<SidebarLink to="/about" icon="fa-solid fa-circle-info">About</SidebarLink>
		</div> -->
	</nav>
</template>

<style>
	
</style>

<style scoped>
	.sidebar {
		background-color: var(--sidebar-bg);
		height: 100%;
		width: 160px;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		overflow-x: hidden;
		padding-top: 20px;
	}

	/* .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background-color: var(--sidebar-bg);
    color: #fff;
    transition: all 0.3s;
	} */
	/* .sidebar h1 {
		height: 2.5em;
	} */

	/* .brand {
		display: flex;
	} */

	/* .logo {
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
	} */

	/* .brand h1 {
		font-size: 1.5rem;
    line-height: 2rem;
		color: white;
	} */

	/* h3 {
		transition: opacity 0.3s ease-in-out;
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	} */

	/* .collapse-icon {
		width: 1.75rem;
		height: 1.75rem;
		background-color: white;
		border: 1px solid var(--sidebar-bg);
		border-radius: 9999px;
		cursor: pointer;
		position: absolute;
		bottom: 2.25rem;
		right: -0.75rem;
		color: var(--sidebar-bg);
		transition: 0.2s linear;
	} */
	/* .collapse-icon svg {
		padding: .3rem;
	} */
	/* .collapse-icon:hover {
		color: var(--sidebar-color-item-hover);
	} */

	/* .rotate-180 {
		transform: rotate(180deg);
		transition: 0.2s linear;
	} */
</style>