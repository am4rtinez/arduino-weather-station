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

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <fa :icon="icon" class="icon"/>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.1s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
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
		margin-right: -0.5em;
	}
	.link.active {
		background-color: var(--sidebar-item-active);
		/* background-color: red; */
		color: var(--sidebar-bg);
	}
	.link .icon {
		flex-shrink: 0;
		width: 25px;
		margin-right: 10px;
	}
</style>