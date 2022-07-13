<script>
	import Sidebar from '@/components/sidebar/Sidebar.vue'
	import { sidebarWidth } from '@/components/sidebar/state'

	export default {
		components: { Sidebar },
		setup () {
			return { sidebarWidth }
		}
	}
</script>

<template>
	<div class="wrapper">
		<Sidebar />
		<!-- <div class="content p-7 flex-1" :style="{ 'margin-left': sidebarWidth }"> -->
		<div class="content">
			<router-view />
		</div>
	</div>
</template>

<style>
	:root {
		--color1: #EDE6DB;
		--color-light: #6df7a2;
		--color2: #417D7A;
		--color3: #1D5C63;
		--color4: #1A3C40;
		--color5: #112031;
		--color6: #393E46;
		--color7: #222831;

		--primary: #4ade80;
		--primary-alt: #22c55e;
		--grey: #64748b;
		--dark: #1e293b;
		--dark-alt: #334155;
		--light: #f1f5f9;

		--sidebar-bg: #111827;
		--sidebar-bg-item-hover: #393E46;
		--sidebar-color-item-hover:var(--color-light);
		--sidebar-item-active: #fff;
	}

	#app {
		font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		display: flex;
	}

	body {
		box-sizing: border-box;
	}

	.wrapper {
		display: flex;
    width: 100%;
	}

	#logo{
		width: 40%;
	}
</style>
