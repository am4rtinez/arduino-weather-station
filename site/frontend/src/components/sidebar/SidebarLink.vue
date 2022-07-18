<template>
	<router-link :to="to" :class="{ active: isActive }">
		<!-- <fa :icon="icon" /> -->
		<span class="material-symbols-rounded icon">{{icon}}</span>
		<span class="text" v-if="!collapsed">
				<slot />
		</span>
	</router-link>
</template>

<script>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { collapsed } from './state'
	export default {
		props: {
			to: { type: String, required: true },
			icon: { type: String, required: true }
		},
		setup(props) {
			const route = useRoute()
			const isActive = computed(() => route.path === props.to)
			return { isActive, collapsed }
		}
	}
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.1s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.button {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: 0.2s ease-in-out;
		padding: 0.5rem 2rem;
		color: white;
	}
	.button:hover {
		background-color: var(--dark-alt);
	}

	.active {
		background-color: var(--dark-alt);
		color: var(--color-light);
		border-right: 4px solid var(--color-light);
	}

	.active .icon {
		color: var(--color-light);
	}

	.text {
		margin-left: 1em;
	}

	.material-symbols-outlined,
	.material-icons {
		font-size: 1.5rem;
		color: var(--light);
		transition: 0.2s ease-in-out;
	}
	/* 
	.link {
		display: flex;
		align-items: center;
		cursor: pointer;
		position: relative;
		font-weight: 400;
		user-select: none;
		margin: 0.1em -0.5em 0.1em 0;
		padding: 0.4em;
		border-radius: 0.25em 0 0 0.25em;
		height: 1.5em;
		color: white;
		text-decoration: none;
	}
	.link:hover {
		background-color: var(--sidebar-bg-item-hover);
		color: var(--sidebar-color-item-hover);
	}
	.link.active {
		background-color: var(--sidebar-item-active);
		color: var(--sidebar-bg);
	} 
	*/
	/* 
	.link .icon {
		flex-shrink: 0;
		width: 25px;
		margin-right: 10px;
	} 
	*/
</style>